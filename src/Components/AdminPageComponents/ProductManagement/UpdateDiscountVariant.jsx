import React, { useState } from "react";
import {
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import { LocalOffer } from "@mui/icons-material";
import api from "../../../services/api";

const DiscountButton = ({ variantId, product }) => {
  const [open, setOpen] = useState(false); // Controls the modal visibility
  const [discountPrice, setDiscountPrice] = useState(""); // Stores the entered discount price
  const [startDate, setStartDate] = useState(""); // Stores the start date
  const [endDate, setEndDate] = useState(""); // Stores the end date
  const [error, setError] = useState(""); // Stores error message for invalid input

  const [discountData, setDiscountData] = useState({}); // Stores the final discount data

  const handleClick = () => {
    setOpen(true); // Opens the modal when the button is clicked
  };

  const handleClose = () => {
    setOpen(false); // Closes the modal
    // Reset all form data
    setDiscountPrice("");
    setStartDate("");
    setEndDate("");
    setError(""); // Reset error message
    setDiscountData({}); // Optionally reset discount data
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Adds leading 0
    const day = d.getDate().toString().padStart(2, "0"); // Adds leading 0
    const hours = d.getHours().toString().padStart(2, "0"); // Adds leading 0
    const minutes = d.getMinutes().toString().padStart(2, "0"); // Adds leading 0
    const seconds = d.getSeconds().toString().padStart(2, "0"); // Adds leading 0

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the discount price input
    if (!discountPrice || isNaN(discountPrice)) {
      setError("Nhập phần trăm giảm giá.");
      return;
    }

    if (discountPrice < 0) {
      setError("Phần trăm giảm giá phải là số dương.");
      return;
    }

    // Validate start and end dates
    if (!startDate || !endDate) {
      setError("Vui lòng chọn ngày bắt đầu và kết thúc.");
      return;
    }

    // Parse the dates into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the end date is greater than the start date
    if (end <= start) {
      setError("Ngày kết thúc phải lớn hơn ngày bắt đầu.");
      return;
    }

    // Format the start and end dates using the custom formatDate function
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Create the discount data object
    const newDiscountData = {
      discountValue: discountPrice,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      variantId,
    };

    setDiscountData(newDiscountData); // Set discountData to the state
    console.log("Discount Data:", newDiscountData); // Log the discount data

    try{
      const response = await api.post('/phone/product/discount', newDiscountData)
      console.log(response.data)
    } catch(e){
      console.log(e)
    }

    handleClose(); // Close the modal after submission
  };

  return (
    <div>
      {/* Discount Button */}
      <Tooltip title="Cập nhật mã giảm giá">
        <IconButton color="primary" aria-label="discount" onClick={handleClick}>
          <LocalOffer />
        </IconButton>
      </Tooltip>

      {/* Modal for the Discount Form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="discount-modal-title"
        aria-describedby="discount-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="discount-modal-title">Cập nhật giảm giá</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Phần trăm giảm"
              type="number"
              variant="outlined"
              fullWidth
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              error={!!error}
              helperText={error}
              margin="normal"
            />
            <TextField
              label="Ngày bắt đầu"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              margin="normal"
              slotProps={{
                inputLabel: {
                  shrink: true, // Keeps the label above the input
                },
              }}
            />
            <TextField
              label="Ngày kết thúc"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              margin="normal"
              slotProps={{
                inputLabel: {
                  shrink: true, // Keeps the label above the input
                },
              }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cập nhật giảm giá
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DiscountButton;
