import React, { useState, useEffect } from 'react';
import { Button, Dialog, Rating, TextField, Snackbar } from '@mui/material';
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
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const isEditMode = !product?.rating;

  // Cập nhật state khi product thay đổi
  useEffect(() => {
    setRating(product?.rating || 0);
    setReview(product?.review || '');
  }, [product]);

  const handleSubmit = () => {
    onSubmit({ rating, review });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="rounded-lg">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Đánh giá {product?.name}</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
          <Close />
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Chất lượng sản phẩm</p>
          <Rating
            value={rating}
            onChange={(e, newValue) => isEditMode && setRating(newValue)}
            size="large"
            readOnly={!isEditMode}
          />
        </div>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Chi tiết đánh giá"
          placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
          value={review}
          onChange={(e) => isEditMode && setReview(e.target.value)}
          disabled={!isEditMode}
        />
      </div>

      <div className="p-4 flex justify-end space-x-3 border-t">
        {isEditMode ? (
          <>
            <Button variant="outlined" onClick={onClose}>Hủy bỏ</Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!rating}
              startIcon={<RateReview />}
            >
              Gửi đánh giá
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={onClose}>Đóng</Button>
        )}
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
    <div className="m-4 bg-white rounded-lg shadow">
      <div className="overflow-auto max-h-[70vh]">
        <div className="grid grid-cols-12 gap-4 p-3 bg-gray-100 font-semibold border-b">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Tên sản phẩm</div>
          <div className="col-span-2">Ngày mua</div>
          <div className="col-span-2">Giá</div>
          <div className="col-span-2 text-right">Số lượng</div>
          <div className="col-span-2 text-center">Đánh giá</div>
        </div>

        <div className="space-y-2 p-3">
          {phones.map((phone, index) => (
            <div key={phone.id} className="grid grid-cols-12 gap-4 items-center hover:bg-gray-50 p-2 rounded">
              <div className="col-span-1">{index + 1}</div>
              <div className="col-span-3 font-medium">{phone.name}</div>
              <div className="col-span-2 text-sm">{phone.date}</div>
              <div className="col-span-2 text-red-600">
                {phone.price.toLocaleString('vi-VN')}₫
              </div>
              <div className="col-span-2 text-right">{phone.quantity}</div>
              <div className="col-span-2 text-center">
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
        message="Cảm ơn đánh giá của bạn!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ 
          '& .MuiSnackbarContent-root': {
            bgcolor: 'success.main',
            color: 'common.white'
          }
        }}
      />
    </div>
  );
}

export default Review;