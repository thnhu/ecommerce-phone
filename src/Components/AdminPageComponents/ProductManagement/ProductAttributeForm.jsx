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

  // Effect để cập nhật formData khi attributes thay đổi
  useEffect(() => {
    if (productData && attributes && product) {
      const productIndex = productData.findIndex(p => p.id === product.id);
      const productAttributes = attributes[productIndex] || {};
      
      setFormData({
        os: productAttributes.os || "",
        cpu: productAttributes.cpu || "",
        ram: productAttributes.ram || "",
        rom: productAttributes.rom || "",
        camera: productAttributes.camera || "",
        pin: productAttributes.pin || "",
        sim: productAttributes.sim || "",
        others: productAttributes.others || ""
      });
    }
  }, [productData, attributes, product]);

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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      console.error("Lỗi khi cập nhật:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Thông số kĩ thuật
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={getFieldLabel(field)}
                variant="outlined"
                fullWidth
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={getPlaceholder(field)}
              />
            </Grid>
          ))}
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang Cập Nhật..." : "Cập nhật"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

// Hàm helper để chuyển đổi tên field thành label
const getFieldLabel = (field) => {
  const labels = {
    os: "Hệ điều hành",
    cpu: "CPU",
    ram: "RAM",
    rom: "ROM",
    camera: "Camera",
    pin: "Dung lượng pin",
    sim: "Số khe SIM",
    others: "Thông số khác"
  };
  return labels[field] || field.toUpperCase();
};

// Hàm helper cho placeholder
const getPlaceholder = (field) => {
  const examples = {
    os: "VD: Android 13",
    cpu: "VD: Snapdragon 8 Gen 2",
    ram: "VD: 8GB",
    rom: "VD: 256GB",
    camera: "VD: 108MP + 12MP + 5MP",
    pin: "VD: 5000mAh",
    sim: "VD: 2",
    others: "VD: Màn hình AMOLED, hỗ trợ 5G"
  };
  return examples[field] || "";
};

export default ProductAttributeForm;