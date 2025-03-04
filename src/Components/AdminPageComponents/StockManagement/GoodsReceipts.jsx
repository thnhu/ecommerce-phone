import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { Inventory as InventoryIcon } from '@mui/icons-material';

const GoodsReceipts = ({ open, onClose, products, onSubmit }) => {
  const [formData, setFormData] = useState({
    staff: '',
    productId: '',
    quantity: 0,
    unitPrice: 0
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.staff.trim()) newErrors.staff = "Vui lòng nhập tên nhân viên";
    if (!formData.productId) newErrors.productId = "Vui lòng chọn sản phẩm";
    if (formData.quantity <= 0) newErrors.quantity = "Số lượng phải lớn hơn 0";
    if (formData.unitPrice <= 0) newErrors.unitPrice = "Đơn giá phải lớn hơn 0";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        total: formData.quantity * formData.unitPrice,
      });
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'unitPrice' ? Number(value) : value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-blue-100 flex items-center gap-2">
        <InventoryIcon fontSize="small" />
        <span className="text-blue-800">Phiếu nhập kho</span>
      </DialogTitle>
      
      <DialogContent>
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          {/* Nhân viên nhập */}
          <div>
            <input
              type="text"
              name="staff"
              value={formData.staff}
              onChange={handleChange}
              placeholder="Tên nhân viên"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.staff && <p className="text-red-500 text-sm mt-1">{errors.staff}</p>}
          </div>

          {/* Chọn sản phẩm */}
          <div>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Chọn sản phẩm</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            {errors.productId && <p className="text-red-500 text-sm mt-1">{errors.productId}</p>}
          </div>

          {/* Nhập số lượng và đơn giá */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Số lượng"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <input
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                placeholder="Đơn giá"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outlined"
              className="hover:bg-gray-100"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Xác nhận nhập kho
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoodsReceipts;