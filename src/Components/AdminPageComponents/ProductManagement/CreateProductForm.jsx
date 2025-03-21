import * as React from "react";
import { useState, useEffect, useRef } from "react";
import api from "../../../services/api";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateProductForm = ({ page, size, open, handleClose, onSuccess }) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    categoryId: "",
    imagePaths: [],
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


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
        categoryId: "",
        imagePaths: [],
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
    if (files) {
      const imagesArray = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };
  // Khi nhấn nút "Thêm hình", trigger click cho input file ẩn
  const handleSelectImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // const handleRemoveImage = (imgId) => {
  //   setImages((prevImages) => {
  //     return prevImages.filter((img) => img.id !== imgId);
  //   });
  // };
  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);

      // Create a new FileList from the updated images
      const updatedFiles = new DataTransfer();
      updatedImages.forEach((img) => updatedFiles.items.add(img.file));

      // Update productData.imagePaths
      setProductData((prevData) => ({
        ...prevData,
        imagePaths: updatedFiles.files,
      }));

      // Update the file input field with the new FileList
      if (fileInputRef.current) {
        fileInputRef.current.files = updatedFiles.files;
      }
      return updatedImages;
    });
  };

  //Take only one images
  useEffect(() => {
    if (productData.imagePaths.length === 1) {
      setErrors((prevErrors) => ({ ...prevErrors, imagePaths: "" }));
    }
  }, [productData.imagePaths]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!productData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống.";
    }

    if (
      !productData.description.trim() ||
      productData.description.length < 10
    ) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự.";
    }

    if (!productData.categoryId) {
      newErrors.categoryId = "Vui lòng chọn nhà cung cấp.";
    }
    if (
      productData.imagePaths.length === 0 ||
      productData.imagePaths.length > 1
    ) {
      newErrors.imagePaths = "Vui lòng chọn một hình ảnh.";
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
            categoryId: productData.categoryId,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (productData.imagePaths) {
      Array.from(productData.imagePaths).forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      const response = await api.post("/phone/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose();
      alert("Thêm sản phẩm thành công");
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      console.error(error.message);
      alert("Thêm sản phẩm thất bại");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Thêm sản phẩm mới</DialogTitle>
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
                <h2 className="text-m font-semibold mb-4">Chọn ảnh sản phẩm</h2>
                <div className="flex flex-wrap gap-2">
                  {/* Hiển thị preview các hình đã chọn */}
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 border rounded overflow-hidden"
                    >
                      <img
                        src={img.preview}
                        alt={`image-${index}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Nút xóa hình */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* Nút thêm hình */}
                  {/* <button
                    type="button"
                    onClick={handleSelectImages}
                    className="w-20 h-20 border rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  >
                    +
                  </button> */}
                  {/* Input file ẩn, cho phép chọn nhiều hình */}
                  {/* <input
                    type="file"
                    name="imagePaths"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  /> */}
                  <div className="">
                    {errors.imagePaths && (
                      <p className="text-red-500 text-sm">
                        {errors.imagePaths}
                      </p>
                    )}
                    <input
                      type="file"
                      name="imagePaths"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className=""
                      multiple
                    />
                  </div>
                </div>
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
    </div>
  );
};

export default CreateProductForm;
