//Can fix bug

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import api from "../../../services/api";

const UpdateProductForm = ({
  updatingProduct,
  open,
  handleClose,
  onSuccess,
}) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    categoryId: "",
    status: "",
    price: "",
    color: "",
    imagePaths: [], // For new images
    removeImageIds: [], // For tracking images to be removed
    related_id: [], // Related product IDs
    variants: [
      {
        color: "",
        price: "",
        stock: "",
      },
    ],
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]); // To store preview of the selected image
  const states = ["DRAFT", "ACTIVE"];

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/phone/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Reset data when the form is closed or when the product changes
  useEffect(() => {
    if (updatingProduct && open) {
      setProductData({
        name: updatingProduct.name,
        description: updatingProduct.description,
        categoryId: updatingProduct.category.id,
        status: updatingProduct.status || "",
        price: updatingProduct.price || "0",
        color: updatingProduct.color || "",
        imagePaths: updatingProduct.images || [], // Initialize with current images
        removeImageIds: [], // Reset remove image IDs
        related_id: updatingProduct.related_id || [], // Set related product IDs
        variants: updatingProduct.variants || [
          {
            color: "",
            price: "",
            stock: "",
          },
        ],
      });
      setImages(updatingProduct.images || []); // Set old images, only keep one
    }
  }, [updatingProduct, open]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    setProductData({
      ...productData,
      imagePaths: files,
    });
    setErrors({ ...errors, imagePaths: "" });
    if (files && files.length > 0) {
      const imageFile = files[0]; // We only allow one image
      const imageArray = [
        {
          file: imageFile,
          preview: URL.createObjectURL(imageFile),
        },
      ];
      setImages(imageArray); // Set the new selected image
    }
  };

  // Trigger file input click
  const handleSelectImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle image removal
  const handleRemoveImage = (imageId) => {
    setProductData((prevData) => ({
      ...prevData,
      removeImageIds: [...prevData.removeImageIds, imageId], // Add image ID to the removal list
    }));
  };

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
      newErrors.categoryId = "Vui lòng chọn danh mục.";
    }

    if (productData.imagePaths.length === 0 && images.length === 0) {
      newErrors.imagePaths = "Vui lòng chọn ít nhất một hình ảnh.";
    }

    return newErrors;
  };

  // Handle form submission
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
            color: productData.color,
            status: productData.status,
            related_id: productData.related_id,
            removeImageIds: productData.removeImageIds, // Include remove image IDs
          }),
        ],
        { type: "application/json" }
      )
    );

    if (productData.imagePaths.length > 0) {
      Array.from(productData.imagePaths).forEach((file) => {
        formData.append("files", file);
      });
    }
    console.log(formData);
    try {
      const response = await api.put(`/phone/product/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose();
      alert("Cập nhật sản phẩm thành công");
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating product", error);
      alert("Cập nhật sản phẩm thất bại");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cập nhật sản phẩm</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* Tên sản phẩm */}
          <TextField
            label="Tên sản phẩm"
            name="name"
            fullWidth
            margin="normal"
            value={productData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />

          {/* Mô tả sản phẩm */}
          <TextField
            label="Mô tả"
            name="description"
            fullWidth
            margin="normal"
            value={productData.description}
            onChange={handleChange}
            multiline
            rows={4}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />

          {/* Danh mục */}
          <FormControl
            fullWidth
            margin="normal"
            error={Boolean(errors.categoryId)}
          >
            <InputLabel>Chọn danh mục</InputLabel>
            <Select
              name="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
              label="Chọn danh mục"
            >
              <MenuItem value="" disabled>
                Chọn danh mục
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && (
              <FormHelperText>{errors.categoryId}</FormHelperText>
            )}
          </FormControl>

          {/* Trạng thái */}
          <FormControl fullWidth margin="normal" error={Boolean(errors.status)}>
            <InputLabel>Chọn trạng thái</InputLabel>
            <Select
              name="status"
              value={productData.status}
              onChange={handleChange}
              label="Chọn trạng thái"
            >
              <MenuItem value="" disabled>
                Chọn trạng thái
              </MenuItem>
              {states.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>

          {/* Hình ảnh */}
          <div>
            <h2 className="text-m font-semibold mb-4">Chọn ảnh sản phẩm</h2>
            <div className="flex flex-wrap gap-2">
              {/* Display existing images */}
              {images.length > 0 &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 border rounded overflow-hidden relative"
                  >
                    <img
                      // src={image.preview}
                      src={`data:image/*;base64,${images[0].data}`}
                      alt="Old image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.file.name)} // Pass the image ID to remove
                      className="absolute top-0 right-0 text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}

              {/* Button to select new image */}
              <button
                type="button"
                onClick={handleSelectImages}
                className="w-20 h-20 border rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
              >
                +
              </button>
              <input
                type="file"
                name="imagePaths"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {errors.imagePaths && (
              <p className="text-red-500 text-sm">{errors.imagePaths}</p>
            )}
          </div>

          <Button
            type="submit"
            style={{
              marginTop: "20px",
              color: "white",
              backgroundColor: "blue",
            }}
          >
            Cập nhật sản phẩm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductForm;
