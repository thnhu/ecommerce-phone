import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  Rating,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Close, RateReview } from "@mui/icons-material";
import api from "../../services/api";
const ReviewDialog = ({ open, onClose, product }) => {
  const [reviewData, setReviewData] = useState({
    productId: "",
    userId: "",
    comment: "",
    rating: "",
    imagePaths: [],
  });
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const isEditMode = !product?.rating;

  // Reset dữ liệu khi đóng form
  useEffect(() => {
    if (!open) {
      setReviewData({
        productId: "",
        userId: "",
        comment: "",
        rating: "",
        imagePaths: [],
      });
      setErrors({});
    }
  }, [open]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    const formData = new FormData();
    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            productId: reviewData.productId,
            userId: reviewData.userId,
            comment: reviewData.comment,
            rating: reviewData.rating,
          }),
        ],
        { type: "application/json" }
      )
    );

    Array.from(reviewData.imagePaths).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await api.post("/phone/review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Xử lý upload file
  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   setProductData({
  //     ...reviewData,
  //     imagePaths: files,
  //   });
  //   setErrors({ ...errors, imagePaths: "" });
  //   if (files) {
  //     // Chuyển đổi FileList thành mảng và tạo URL preview cho từng file
  //     const imagesArray = Array.from(files).map((file) => ({
  //       file,
  //       preview: URL.createObjectURL(file),
  //     }));
  //     // Cập nhật state, ghép thêm các file mới đã chọn (nếu cần xóa thì tùy chỉnh lại)
  //     setImages((prevImages) => [...prevImages, ...imagesArray]);
  //   }
  // };
  const handleFileChange = (e) => {
    const files = e.target.files;
    setReviewData({
      ...reviewData,
      newImages: files,
    });
    setErrors({ ...errors, imagePaths: "" });
  };

  // const handleSelectImages = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };
  // const handleRemoveImage = (index) => {
  //   setImages((prevImages) => {
  //     const updatedImages = prevImages.filter((_, i) => i !== index);
  //     return updatedImages;
  //   });
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg max-w-lg md:max-w-xl lg:max-w-2xl w-full shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Đánh giá {product?.name}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Close />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div>
            <p className="text-sm font-medium mb-2">Chất lượng sản phẩm</p>
            <Rating
              value={reviewData.rating}
              onChange={handleChange}
              size="large"
              readOnly={!isEditMode}
              name="rating"
            />
          </div>

          <TextField
            fullWidth
            multiline
            rows={2}
            name="comment"
            label="Chi tiết đánh giá"
            placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
            value={reviewData.comment}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>

        {/* Ảnh sản phẩm */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <h2 className="text-m font-semibold mb-4">Chọn ảnh đánh giá</h2>
          <div className="flex flex-wrap gap-2">
            {/* Hiển thị preview các hình đã chọn */}
            {/* {images.map((img, index) => (
              <div
                key={index}
                className="relative w-20 h-20 border rounded overflow-hidden"
              >
                <img
                  src={img.preview}
                  alt={`image-${index}`}
                  className="w-full h-full object-cover"
                /> */}
                {/* Nút xóa hình */}
                {/* <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))} */}

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

        <div className="p-4 flex justify-end space-x-3 border-t">
          {isEditMode ? (
            <>
              <Button variant="outlined" onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!Rating}
                startIcon={<RateReview />}
              >
                Gửi đánh giá
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={onClose}>
              Đóng
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
};
export default ReviewDialog