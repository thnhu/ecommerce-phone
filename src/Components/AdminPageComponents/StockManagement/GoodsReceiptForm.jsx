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
  const [warehouseData, setWarehouseData] = useState({
    user: "",
    product: "",
    variant: "",
    quantity: "",
    priceAtStock: "",
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  
  // const fetchUserName = async () => {
  //   try {
  //     const response = await api.get("/phone/category");
  //     setCategories(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Không thể tải danh sách nhà cung cấp');
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetch("/phone/user/myInfo")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data));

  //   fetch("/api/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    if (warehouseData.product) {
      fetch(`/api/products/${warehouseData.product}/versions`)
        .then((res) => res.json())
        .then((data) => setVariants(data));
    }
  }, [warehouseData.product]);

  const handleChange = (e) => {
    setWarehouseData({ ...warehouseData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!warehouseData.user) newErrors.user = "Vui lòng chọn người nhập.";
    if (!warehouseData.product) newErrors.product = "Vui lòng chọn sản phẩm.";
    if (!warehouseData.variant) newErrors.variant = "Vui lòng chọn phiên bản.";
    if (!warehouseData.quantity || warehouseData.quantity <= 0) newErrors.quantity = "Số lượng phải lớn hơn 0.";
    if (!warehouseData.price || warehouseData.price <= 0) newErrors.price = "Giá kho phải lớn hơn 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(warehouseData);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: "darkgreen" }}>Nhập kho</DialogTitle>
      <DialogContent>
        <div className="p-3">
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            {/* Người nhập */}
            <div>
              <select name="user" value={warehouseData.user} onChange={handleChange} className="w-96 p-1">
                <option value="">Chọn người nhập</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              {errors.user && <p className="text-red-500 text-sm">{errors.user}</p>}
            </div>

            {/* Sản phẩm */}
            <div>
              <select name="product" value={warehouseData.product} onChange={handleChange} className="w-96 p-1">
                <option value="">Chọn sản phẩm</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              {errors.product && <p className="text-red-500 text-sm">{errors.product}</p>}
            </div>

            {/* Phiên bản */}
            <div>
              <select name="variant" value={warehouseData.variant} onChange={handleChange} className="w-96 p-1">
                <option value="">Chọn phiên bản</option>
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>{variant.name}</option>
                ))}
              </select>
              {errors.variant && <p className="text-red-500 text-sm">{errors.variant}</p>}
            </div>

            {/* Số lượng */}
            <div>
              <input
                type="number"
                name="quantity"
                value={warehouseData.quantity}
                onChange={handleChange}
                placeholder="Số lượng"
                className="outline-none w-96 p-1 border-b border-gray-300"
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
            </div>

            {/* Giá kho */}
            <div>
              <input
                type="number"
                name="price"
                value={warehouseData.price}
                onChange={handleChange}
                placeholder="Giá kho"
                className="outline-none w-96 p-1 border-b border-gray-300"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <DialogActions>
              <Button onClick={handleClose}>
                Hủy
              </Button>
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
