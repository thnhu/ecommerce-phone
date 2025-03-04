import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";

const ProductVariantMenu = ({ anchorEl, open, handleClose, product, onAddVariant }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {/* Only show "Add Variant" option */}
      <MenuItem onClick={() => { 
        onAddVariant(); 
        handleClose(); 
      }}>
        Thêm mẫu
      </MenuItem>
    </Menu>
  );
};

export default ProductVariantMenu;
