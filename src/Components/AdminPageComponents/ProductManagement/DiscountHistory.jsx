import { useEffect, useState } from "react";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import api from "../../../services/api";

const DiscountHistory = ({ handleClose, open, selectedVariant }) => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (!selectedVariant) return;
    const fetchVariantPrice = async () => {
      try {
        const response = await api.get(
          `/phone/product/price/getAll/${selectedVariant.id}`
        );
        console.log(response.data)
        setPrices(response.data);
      } catch (error) {
        console.log("Error fetching prices: ", error);
      }
    };

    fetchVariantPrice();
  }, [selectedVariant]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  useEffect(() => console.log(prices), [prices])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Lịch sử giá</DialogTitle>
      <DialogContent>
        {prices.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 w-full">
            <p className="font-semibold border-b p-2 text-center">Ngày bắt đầu</p>
            <p className="font-semibold border-b p-2 text-center">Ngày kết thúc</p>
            <p className="font-semibold border-b p-2 text-center">Giá</p>
            {prices.map((price, index) => (
              <React.Fragment key={index}>
                <p className="border p-2 text-center">
                  {formatDate(price.startDate)}
                </p>
                <p className="border p-2 text-center">
                  {price.endDate ? formatDate(price.endDate) : "Chưa kết thúc"}
                </p>
                <p className="border p-2 text-center">{price.price} vnđ</p>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="text-center p-2">Không có dữ liệu lịch sử giá.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountHistory;
