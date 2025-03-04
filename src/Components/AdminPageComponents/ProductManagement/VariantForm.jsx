import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const VariantForm = ({
  open,
  onClose,
  onSubmit,
  variant,
  actionType,
  product,
}) => {
  const [formData, setFormData] = useState({
    color: "",
    price: "",
    stock: "",
    sold: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (actionType === "update" && variant) {
      setFormData({
        color: variant.color || "",
        price: variant.price || "",
        stock: variant.stock || "",
      });
    }
  }, [actionType, variant]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.color.trim()) {
      newErrors.color = "Cần nhập màu";
    }
    if (
      !formData.price ||
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Giá tiền phải là số dương";
    }
    if (
      !formData.stock ||
      isNaN(formData.stock) ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Số lượng hàng phải lớn là số dương";
    }
    if (actionType === "update") {
      if (formData.sold && Number(formData.sold) > Number(formData.stock)) {
        newErrors.sold = "Số lượng bán không thể nhiều hơn số lượng hàng";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data for submit based on actionType (create or update)
    const variantData = {
      ...formData,
      productId: product.id,
    };

    // Call the onSubmit function with the variant data
    onSubmit(variantData);
    onClose(); // Close the form after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {actionType === "create" ? "Tạo mẫu" : "Cập nhật mẫu"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Màu sắc"
            name="color"
            value={formData.color}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.color)}
            helperText={errors.color}
          />
          <TextField
            label="Giá tiền"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.price)}
            helperText={errors.price}
          />
          <TextField
            label="Số lượng"
            name="stock"
            value={formData.stock - formData.sold || formData.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.stock)}
            helperText={errors.stock}
          />
          {actionType == "update" ? (
            <TextField
              label="Đã bán"
              name="sold"
              value={formData.sold}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.sold)}
              helperText={errors.sold}
            />
          ) : null}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {actionType === "create" ? "Create Variant" : "Update Variant"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VariantForm;
