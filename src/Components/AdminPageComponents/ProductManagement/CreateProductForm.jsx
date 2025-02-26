import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState, useEffect } from "react";
import api from '../../../services/api'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateProductForm = ({ page, size, open, handleClose }) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imagePaths: [],
    color: "",
  });
  
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  // Lấy nhà cung cấp từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/phone/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // Reset dữ liệu khi đóng form
  useEffect(() => {
    if (!open) {
      setProductData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        imagePaths: [],
        color: "",
      });
      setErrors({});
    }
  }, [open]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  // Xử lý upload file
  const handleFileChange = (e) => {
    const files = e.target.files;
    setProductData({
      ...productData,
      imagePaths: files,
    });
    setErrors({ ...errors, imagePaths: "" });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!productData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống.";
    }

    if (!productData.name.trim()) {
      newErrors.color = "Màu sắc không để trống";
    }

    if (
      !productData.description.trim() ||
      productData.description.length < 10
    ) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự.";
    }

    if (
      !productData.price ||
      isNaN(productData.price) ||
      Number(productData.price) <= 0
    ) {
      newErrors.price = "Giá sản phẩm phải là một số lớn hơn 0.";
    }

    if (!productData.categoryId) {
      newErrors.categoryId = "Vui lòng chọn danh mục.";
    }

    if (productData.imagePaths.length === 0) {
      newErrors.imagePaths = "Vui lòng chọn ít nhất một hình ảnh.";
    }

    return newErrors;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            categoryId: productData.categoryId,
            color: productData.color
          }),
        ],
        { type: "application/json" }
      )
    );

    Array.from(productData.imagePaths).forEach((file) => {
      formData.append("files", file);
    });

    try {
        const response = await api.post("/phone/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
  };

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle sx={{ color: "darkgreen" }}>
        Thêm sản phẩm mới
      </DialogTitle>
      <DialogContent>
        <div className="p-3">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Tên sản phẩm */}
            <div>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                className="outline-none w-96 p-1"
                style={{ borderBottom: "1px solid #E4E0E1" }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Mô tả sản phẩm */}
            <div>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Mô tả sản phẩm"
                className="outline-none w-96 p-1"
                style={{ borderBottom: "1px solid #E4E0E1" }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            {/* Màu sắc mặc định*/}
            <div>
              <input
                name="color"
                value={productData.color}
                onChange={handleChange}
                placeholder="Màu sắc mặc định"
                className="outline-none w-96 p-1"
                style={{ borderBottom: "1px solid #E4E0E1" }}
              />
              {errors.color && (
                <p className="text-red-500 text-sm">{errors.color}</p>
              )}
            </div>

            {/* Giá sản phẩm */}
            <div>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Giá sản phẩm"
                className="outline-none w-96 p-1"
                style={{ borderBottom: "1px solid #E4E0E1" }}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            {/* Danh mục */}            
            <div>
              <select
              name="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
              className="outline-none w-96 p-1"
              style={{ borderBottom: "1px solid #E4E0E1" }}
            >
              <option value="" disabled>
                Chọn nhà cung cấp
              </option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
                <p className="text-red-500 text-sm">{errors.categoryId}</p>
              )}
            </div>

            {/* Ảnh sản phẩm */}
            <div>
              <input
                type="file"
                name="imagePaths"
                multiple
                onChange={handleFileChange}
                className="outline-none w-96 p-1"
                style={{ borderBottom: "1px solid #E4E0E1" }}
                accept="image/*"
              />
              {errors.imagePaths && (
                <p className="text-red-500 text-sm">{errors.imagePaths}</p>
              )}
            </div>

            
            <Button
              type="submit"
              style={{
                marginBottom: "10px",
                color: "white",
                backgroundColor: "blue",
              }}
            >
              Thêm sản phẩm
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;