import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import api from "../../../services/api";

const ProductAttributeForm = ({ product }) => {
  const [formData, setFormData] = useState({
    os: "IOS 18",
    cpu: "A16 Bionic",
    ram: "4GB",
    rom: "64GB",
    camera: "50MP",
    pin: "10000MAH",
    sim: "2",
    others: "Dynamic Island, công nghệ 5G",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData );
    try {
      const response = await api.put(`/phone/product/${product.id}/attribute`, formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log("Error Request:", error.request);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Đặc tả thiết bị
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="OS"
              variant="outlined"
              fullWidth
              name="os"
              value={formData.os}
              onChange={handleChange}
              placeholder="IOS 18"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="CPU"
              variant="outlined"
              fullWidth
              name="cpu"
              value={formData.cpu}
              onChange={handleChange}
              placeholder="A16 Bionic"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="RAM"
              variant="outlined"
              fullWidth
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              placeholder="4GB"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ROM"
              variant="outlined"
              fullWidth
              name="rom"
              value={formData.rom}
              onChange={handleChange}
              placeholder="64GB"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Camera"
              variant="outlined"
              fullWidth
              name="camera"
              value={formData.camera}
              onChange={handleChange}
              placeholder="50MP"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pin"
              variant="outlined"
              fullWidth
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="10000MAH"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="SIM"
              variant="outlined"
              fullWidth
              name="sim"
              value={formData.sim}
              onChange={handleChange}
              placeholder="2"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mô tả khác"
              variant="outlined"
              fullWidth
              name="others"
              value={formData.others}
              onChange={handleChange}
              placeholder=""
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cập nhật
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProductAttributeForm;
