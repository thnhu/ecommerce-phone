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

  const validateRating = (rating) => {
    if (rating === null || rating === undefined || rating === "") {
      return "Vui lòng đánh giá số sao.";
    }
    if (isNaN(rating) || rating <= 0 || rating > 5) {
      return "Đánh giá không hợp lệ.";
    }
    return ""; // No error
  };

  const validateForm = () => {
    const newErrors = {};

    const ratingError = validateRating(reviewData.rating);
    if (ratingError) newErrors.rating = ratingError;

    if (!reviewData.comment.trim()) {
      newErrors.comment = "Bình luận không được để trống";
    }

    if (!reviewData.imagePaths || reviewData.imagePaths.length === 0) {
      newErrors.imagePaths = "Hình ảnh không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

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
    if (!validateForm()) {
      return;
    }
    try {
      const response = await api.get("/phone/user/myInfo");
      setReviewData((prev) => ({
        ...prev,
        userId: response.data.id,
      }));
    } catch (error) {
      console.log("error fetching userdata" + error);
    }
    const formData = new FormData();
    // console.log(product.productId);
    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            prdId: product.productId,
            userId: reviewData.userId,
            comment: reviewData.comment,
            rating: reviewData.rating,
          }),
        ],
        { type: "application/json" }
      )
    );
    console.log(reviewData.comment);
    console.log(reviewData.rating);
    Array.from(reviewData.imagePaths).forEach((file) => {
      formData.append("files", file);
    });

    // **Debug: Log FormData contents**
    console.log("FormData content:");
    for (let pair of formData.entries()) {
      if (pair[1] instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function () {
          console.log(pair[0], reader.result); // Logs Blob content as text
        };
        reader.readAsText(pair[1]); // Read blob content
      } else {
        console.log(pair[0], pair[1]);
      }
    }

    try {
      const response = await api.post("/phone/review", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Đánh giá thành công");
      console.log("API Response:", response);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setReviewData((prevData) => ({
      ...prevData,
      imagePaths: files,
    }));

    // Generate preview URLs
    const imagesArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...imagesArray]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);

      const updatedFiles = new DataTransfer();
      updatedImages.forEach((img) => updatedFiles.items.add(img.file));

      setReviewData((prevData) => ({
        ...prevData,
        imagePaths: updatedFiles.files,
      }));

      if (fileInputRef.current) {
        fileInputRef.current.files = updatedFiles.files;
      }
      return updatedImages;
    });
  };
  useEffect(() => {
    if (reviewData.imagePaths.length === 1) {
      setErrors((prevErrors) => ({ ...prevErrors, imagePaths: "" }));
    }
  }, [reviewData.imagePaths]);

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
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
            )}
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
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
        </div>

        {/* Ảnh sản phẩm */}
        <div className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <div className="flex flex-wrap gap-2">
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
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <div className="">
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
          </div>
          {errors.imagePaths && (
            <p className="text-red-500 text-sm mt-1">{errors.imagePaths}</p>
          )}
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
export default ReviewDialog;
