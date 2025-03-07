import React from "react";
import { Menu, MenuItem } from "@mui/material";

const ProductVariantMenu = ({
  anchorEl,
  open,
  handleClose,
  product,
  onAddVariant,
  onOpenAttribute, // This function should open the attribute form and pass product to it
  setAttributes
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {/* Pass product to onOpenAttribute */}
      <MenuItem
        onClick={() => {
          onOpenAttribute(product); // Pass the selected product to the parent
          console.log(product)
          handleClose();
        }}
      >
        Cập nhật thuộc tính
      </MenuItem>
      
      <MenuItem
        onClick={() => {
          onAddVariant();
          handleClose();
        }}
      >
        Thêm mẫu
      </MenuItem>
    </Menu>
  );
};

export default ProductVariantMenu;
