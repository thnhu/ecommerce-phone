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
import ReviewDialog from "./ReviewDialog";


function Review() {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const size = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [testPhone, setTestPhone] = useState();
  const [orders, setOrders] = useState();
  const [phoneInfo, setPhoneInfo] = useState();

  const handleFetch = async () => {
    try {
      const userDataResponse = await api.get("/phone/user/myInfo");
      const userId = userDataResponse.data.id;

      const response = await api.get(
        `/phone/order?status=DELIVERED&pageNumber=${currentPage}&pageSize=${size}&userId=${userId}`
      );

      const fetchedOrders = response.data.content || [];
      console.log("Fetched Orders:", fetchedOrders);

      const latestOrders = {}; // Stores the latest order for each phone
      const phoneSet = new Set();

      fetchedOrders.forEach((order) => {
        if (Array.isArray(order.items)) {
          order.items.forEach((item) => {
            if (item.prdId) {
              const existingOrder = latestOrders[item.prdId];
              if (
                !existingOrder ||
                new Date(order.orderDate) > new Date(existingOrder.orderDate)
              ) {
                latestOrders[item.prdId] = {
                  ...order, // Store full order object
                  variantId: item.variantId,
                  quantity: item.quantity,
                  priceAtOrder: item.priceAtOrder,
                };
              }

              phoneSet.add(item.prdId);
            }
          });
        }
      });

      setOrders(Object.values(latestOrders)); // Store only the latest orders per phone
      setTestPhone(Array.from(phoneSet)); // Store unique phone IDs

      // Fetch phone details asynchronously and combine with order details
      const phoneDetailsPromises = Array.from(phoneSet).map(async (phoneId) => {
        try {
          const phoneInfoResponse = await api.get(`/phone/product/${phoneId}`);
          const phoneData = phoneInfoResponse.data;

          return {
            name: phoneData.name,
            orderId: latestOrders[phoneId].orderId,
            orderDate: formatDate(latestOrders[phoneId].orderDate), // Now formatted
            variantId: latestOrders[phoneId].variantId,
            quantity: latestOrders[phoneId].quantity,
            priceAtOrder: latestOrders[phoneId].priceAtOrder,
          };
        } catch (error) {
          console.error("Error fetching phone info:", error);
          return null;
        }
      });

      const phoneDetails = await Promise.all(phoneDetailsPromises);
      setPhoneInfo(phoneDetails.filter((phone) => phone !== null)); // Remove failed fetches
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="m-4 bg-white rounded-lg pt-20 pb-12">
      {phoneInfo && (
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
            {phoneInfo.map((phone, index) => (
              <div
                key={index}
                className="flex flex-wrap md:grid md:grid-cols-12 gap-4 items-center hover:bg-gray-50 p-2 rounded"
              >
                <div className="w-full md:col-span-1 font-semibold md:w-auto">
                  {index + 1}
                </div>
                <div className="w-full md:col-span-3 font-medium md:w-auto min-w-0">
                  {phone.name}
                </div>
                <div className="w-full md:col-span-2 text-sm md:w-auto">
                  {phone.orderDate}
                </div>
                <div className="w-full md:col-span-2 text-red-600 md:w-auto">
                  {phone.priceAtOrder.toLocaleString("vi-VN")}₫
                </div>
                <div className="w-full md:col-span-2 text-right md:w-auto min-w-0">
                  <span className="md:hidden">Số lượng: </span>
                  {phone.quantity}
                </div>
                <div className="w-full md:col-span-2 text-center md:w-auto">
                  <Button
                    variant="outlined"
                    color={phone.rating ? "success" : "primary"}
                    onClick={() => {
                      setSelectedPhone(phone);
                      setDialogOpen(true);
                    }}
                    className="rounded-full"
                  >
                    {phone.rating ? "Xem đánh giá" : "Đánh giá ngay"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ReviewDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={selectedPhone}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Cảm ơn đánh giá của bạn
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Review;
