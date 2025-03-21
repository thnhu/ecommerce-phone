import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import api from "../../../services/api";

const ProductAttributeForm = ({
  product,
  handleClose,
  setAttributes,
  attributes,
  productData,
}) => {
  const [formData, setFormData] = useState({
    os: "",
    cpu: "",
    ram: "",
    rom: "",
    camera: "",
    pin: "",
    sim: "",
    others: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track submitting state

  // const fetchAttributes = async (index) => {
  //   try {
  //     // Make a single request for the product's attributes
  //     const attRes = await api.get(`/phone/product/${product.id}/attribute`);

  //     // Log the attribute data if needed
  //     console.log("Updating attributes...");

  //     // Update the attribute at the specific index in the array
  //     setAttributes((prev) => {
  //       const newAttributes = [...prev];
  //       newAttributes[index] = attRes.data; // Update the attribute at the specific index
  //       return newAttributes;
  //     });
  //   } catch (e) {
  //     console.error("Error fetching attributes:", e);
  //   }
  // };
  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const response = await api.get(
          `/phone/product/${product.id}/attribute`
        );
        if(response.data){
          setFormData(response.data)
        }
      } catch (e) {
        console.log("Lỗi dữ liệu");
      }
    };
    fetchSingle();
  }, []);

  const fetchAttributes = async () => {
    try {
      const attributePromises = productData.map(async (phone) => {
        const attRes = await api.get(`/phone/product/${phone.id}/attribute`);
        return attRes.data; // Return the attribute data for each product
      });

      // Wait for all promises to resolve
      const resolvedAttributes = await Promise.all(attributePromises);

      // Set the attributes once all promises are resolved
      setAttributes(resolvedAttributes);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true while submitting

    try {
      const response = await api.put(
        `/phone/product/${product.id}/attribute`,
        formData
      );
      console.log(response.data);

      // Call fetchAttributes with the index to update the specific attribute
      fetchAttributes();

      handleClose(); // Close the form if submission is successful
    } catch (error) {
      console.error(error);
      console.log("Error Request:", error.request);
    } finally {
      setIsSubmitting(false); // Reset submitting state
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting} // Disable the button while submitting
            >
              {isSubmitting ? "Đang Cập Nhật..." : "Cập nhật"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProductAttributeForm;
