import React, { useState, useEffect, useRef } from 'react';
import { Button, Dialog, Rating, TextField, Snackbar, Alert } from '@mui/material';
import { Close, RateReview } from '@mui/icons-material';

const initialPhones = [
  { 
    id: 1, 
    name: 'iPhone 15 Pro Max', 
    quantity: 1, 
    price: 28490000, 
    date: '15/02/2025', 
    rating: null, 
    review: '' 
  },
  { 
    id: 2, 
    name: 'Samsung Galaxy S24 Ultra', 
    quantity: 2, 
    price: 24990000, 
    date: '20/02/2025', 
    rating: null, 
    review: '' 
  },
  { 
    id: 3, 
    name: 'Xiaomi Redmi Note 13', 
    quantity: 1, 
    price: 5490000, 
    date: '25/02/2025', 
    rating: null, 
    review: '' 
  },
];

const ReviewDialog = ({ open, onClose, onSubmit, product }) => {
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
      "review",
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
    const handleFileChange = (e) => {
      const files = e.target.files;
      setProductData({
        ...reviewData,
        imagePaths: files,
      });
      setErrors({ ...errors, imagePaths: "" });
      if (files) {
        // Chuyển đổi FileList thành mảng và tạo URL preview cho từng file
        const imagesArray = Array.from(files).map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        // Cập nhật state, ghép thêm các file mới đã chọn (nếu cần xóa thì tùy chỉnh lại)
        setImages((prevImages) => [...prevImages, ...imagesArray]);
      }
    };
    // Khi nhấn nút "Thêm hình", trigger click cho input file ẩn
    const handleSelectImages = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const handleRemoveImage = (index) => {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((_, i) => i !== index);
        return updatedImages;
      });
    };  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg max-w-lg md:max-w-xl lg:max-w-2xl w-full shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Đánh giá {product?.name}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
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
            />
          </div>
    
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Chi tiết đánh giá"
            placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
            value={reviewData.comment}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>

                      {/* Ảnh sản phẩm */}
                      <div className='p-6 space-y-4 overflow-y-auto max-h-[80vh]'>
            <h2 className="text-m font-semibold mb-4">Chọn ảnh đánh giá</h2>
            <div className="flex flex-wrap gap-2">
              {/* Hiển thị preview các hình đã chọn */}
              {images.map((img, index) => (
             <div key={index} className="relative w-20 h-20 border rounded overflow-hidden">
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
                  <button
                    type="button"
                    onClick={handleSelectImages}
                    className="w-20 h-20 border rounded flex items-center justify-center text-gray-500 hover:bg-gray-100"
                  >
                    +
                  </button>
                  {/* Input file ẩn, cho phép chọn nhiều hình */}
                  <input
                    type="file"
                    name="imagePaths"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

    
        <div className="p-4 flex justify-end space-x-3 border-t">
          {isEditMode ? (
            <>
              <Button variant="outlined" onClick={onClose}>Hủy bỏ</Button>
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
            <Button variant="contained" onClick={onClose}>Đóng</Button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

function Review() {
  const [phones, setPhones] = useState(initialPhones);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Xử lý riêng cho từng sản phẩm
  const handleReviewSubmit = ({ rating, review }) => {
    const updatedPhones = phones.map(phone => 
      phone.id === selectedPhone.id 
        ? { ...phone, rating: Number(rating), review } 
        : phone
    );
    setPhones(updatedPhones);
    setSnackbarOpen(true);
  };

  return (
      <div className="m-4 bg-white rounded-lg pt-20 pb-12">
        <div className="overflow-auto max-h-[70vh]">
          <div className="hidden md:grid grid-cols-12 gap-4 p-3 bg-gray-100 font-semibold border-b">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Tên sản phẩm</div>
            <div className="col-span-2">Ngày mua</div>
            <div className="col-span-2">Giá</div>
            <div className="col-span-2 text-right">Số lượng</div>
            <div className="col-span-2 text-center">Đánh giá</div>
          </div>
    
          <div className="space-y-2 p-3">
            {phones.map((phone, index) => (
              <div
                key={phone.id}
                className="flex flex-wrap md:grid md:grid-cols-12 gap-4 items-center hover:bg-gray-50 p-2 rounded"
              >
                <div className="w-full md:col-span-1 font-semibold md:w-auto">{index + 1}</div>
                <div className="w-full md:col-span-3 font-medium md:w-auto min-w-0">{phone.name}</div>
                <div className="w-full md:col-span-2 text-sm md:w-auto">{phone.date}</div>
                <div className="w-full md:col-span-2 text-red-600 md:w-auto">
                  {phone.price.toLocaleString('vi-VN')}₫
                </div>
                <div className="w-full md:col-span-2 text-right md:w-auto min-w-0">
                  <span className="md:hidden">Số lượng: </span>{phone.quantity}
                </div>
                <div className="w-full md:col-span-2 text-center md:w-auto">
                  <Button
                    variant="outlined"
                    color={phone.rating ? 'success' : 'primary'}
                    onClick={() => {
                      setSelectedPhone(phone);
                      setDialogOpen(true);
                    }}
                    className="rounded-full"
                  >
                    {phone.rating ? 'Xem đánh giá' : 'Đánh giá ngay'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
          <ReviewDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleReviewSubmit}
        product={selectedPhone}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{vertical:'top', horizontal:'center'}}  
      >
        <Alert severity="success" sx={{ width: '100%'}}>
          Cảm ơn đánh giá của bạn
      </Alert>
      </Snackbar>
    </div>
  );
}

export default Review;