import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import api from '../../../services/api'

const GoodsReceiptForm = ({ open, handleClose, handleSubmit }) => {
  const [stockData, setStockData] = useState({
    userId: "",
    stockItems: [{
      variantId: "",
      productId: "",
      priceAtStock: "",
      quantity: ""
    }]
  });         
  
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user info và danh sách sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin người dùng
        const userResponse = await api.get("/phone/user/myInfo");
        setUserInfo(userResponse.data);
        setStockData(prev => ({
          ...prev,
          userId: userResponse.data.id
        }));

        // Lấy danh sách sản phẩm với variants
        const productResponse = await api.get("/phone/product?page=0&size=10");
        setProducts(productResponse.data.content);
        //console.log(products[5].variants[0].color);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Xử lý thay đổi sản phẩm
  const handleProductChange = (productId, index) => {
    const selectedProduct = products.find(p => p.id === productId);
    setVariants(selectedProduct?.variants || []);
    
    const updatedItems = [...stockData.stockItems];
    updatedItems[index] = {
      ...updatedItems[index],
      productId: productId,
      variantId: "" // Reset variant khi đổi sản phẩm
    };
    
    setStockData(prev => ({
      ...prev,
      stockItems: updatedItems
    }));
  };

  // Thêm dòng nhập hàng mới
  const addStockItem = () => {
    setStockData(prev => ({
      ...prev,
      stockItems: [
        ...prev.stockItems,
        { variantId: "", productId: "", priceAtStock: "", quantity: "" }
      ]
    }));
  };

  // Xử lý thay đổi thông tin nhập
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...stockData.stockItems];
    updatedItems[index][field] = value;
    
    setStockData(prev => ({
      ...prev,
      stockItems: updatedItems
    }));
  };

  // Validate form
  const validate = () => {
    let newErrors = {};
    
    stockData.stockItems.forEach((item, index) => {
      if (!item.productId) {
        newErrors[`product_${index}`] = "Vui lòng chọn sản phẩm";
      }
      if (!item.variantId) {
        newErrors[`variant_${index}`] = "Vui lòng chọn phân loại";
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`quantity_${index}`] = "Số lượng không hợp lệ";
      }
      if (!item.priceAtStock || item.priceAtStock <= 0) {
        newErrors[`price_${index}`] = "Giá nhập không hợp lệ";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        userId: stockData.userId,
        stockItemRequestDTO: stockData.stockItems.map(item => ({
          variantId: item.variantId,
          productId: item.productId,
          priceAtStock: item.priceAtStock,
          quantity: item.quantity
        }))
      };

      await api.post("/phone/stock", payload);
      alert("Nhập hàng thành công!")
      handleClose();
    } catch (err) {
      console.error("Lỗi khi nhập hàng:", err);
      setErrors({ general: "Có lỗi xảy ra khi nhập hàng. Vui lòng thử lại!" });
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: "darkgreen" }}>Nhập kho</DialogTitle>
      <DialogContent>
        <div className="p-3">
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <h3 className="font-semibold">Người nhập hàng: {userInfo?.displayName}</h3>
            </div>

            {stockData.stockItems.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div>
                  <select
                    value={item.productId}
                    onChange={(e) => handleProductChange(e.target.value, index)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  {errors[`product_${index}`] && (
                    <p className="text-red-500 text-sm">{errors[`product_${index}`]}</p>
                  )}
                </div>

                <div>
                  <select
                    value={item.variantId}
                    onChange={(e) => handleItemChange(index, 'variantId', e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={!item.productId}
                  >
                    <option value="">Chọn phân loại</option>
                    {variants.map(variant => (
                      <option key={variant.id} value={variant.id}>
                        {variant.color}
                      </option>
                    ))}
                  </select>
                  {errors[`variant_${index}`] && (
                    <p className="text-red-500 text-sm">{errors[`variant_${index}`]}</p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Số lượng"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  {errors[`quantity_${index}`] && (
                    <p className="text-red-500 text-sm">{errors[`quantity_${index}`]}</p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Giá nhập"
                    value={item.priceAtStock}
                    onChange={(e) => handleItemChange(index, 'priceAtStock', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  {errors[`price_${index}`] && (
                    <p className="text-red-500 text-sm">{errors[`price_${index}`]}</p>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addStockItem}
              variant="outlined"
              style={{ marginTop: '1rem' }}
            >
              Thêm dòng nhập
            </Button>

            {errors.general && (
              <div className="text-red-500 text-center mt-4">
                {errors.general}
              </div>
            )}

            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button type="submit" color="primary" variant="contained">
                Nhập kho
              </Button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoodsReceiptForm;