import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"; // Import the CloseIcon

const AddressForm = ({ onSubmit, onCancel, address, onUpdateAddress }) => {
  // Default empty address state for add mode
  const defaultAddress = {
    detail: "",
    ward: "",
    district: "",
    province: "",
    receiverName: "",
    receiverPhone: "",
  };

  // Initialize the state for the address form
  const [newAddress, setNewAddress] = useState(defaultAddress);

  // Reset the form when the address changes (i.e., switching between add/edit)
  useEffect(() => {
    if (address) {
      setNewAddress(address); // Fill the form with the address data for editing
    } else {
      setNewAddress(defaultAddress); // Reset to default empty state for adding new address
    }
  }, [address]); // This will run whenever the `address` prop changes

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newAddress);
  };

  return (
    <div className="bg-white p-4 border relative size-full">
      {/* Close button */}
      <div className="absolute top-2 right-2 z-10">
        <IconButton
          onClick={onCancel} // Close the form when clicked
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </div>

      {/* Conditional heading */}
      <h2 className="text-lg font-bold lg:text-2xl">
        {address ? "Sửa Địa Chỉ" : "Thêm Địa Chỉ"}
      </h2>

      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={address == null ? handleSubmit : onUpdateAddress}>
        {/* Detail input */}
        <div>
          <label className="block">Địa chỉ chi tiết:</label>
          <input
            type="text"
            name="detail"
            value={newAddress.detail}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>
        
        {/* Ward input */}
        <div>
          <label className="block">Phường/Xã:</label>
          <input
            type="text"
            name="ward"
            value={newAddress.ward}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>
        
        {/* District input */}
        <div>
          <label className="block">Quận/Huyện:</label>
          <input
            type="text"
            name="district"
            value={newAddress.district}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>
        
        {/* Province input */}
        <div>
          <label className="block">Tỉnh/Thành phố:</label>
          <input
            type="text"
            name="province"
            value={newAddress.province}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        {/* Receiver name input */}
        <div>
          <label className="block">Tên người nhận:</label>
          <input
            type="text"
            name="receiverName"
            value={newAddress.receiverName}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        {/* Receiver phone input */}
        <div>
          <label className="block">Số điện thoại:</label>
          <input
            type="text"
            name="receiverPhone"
            value={newAddress.receiverPhone}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        {/* Submit and Cancel buttons */}
        <div className="flex mt-4">
          <button type="submit" className="p-2 bg-blue-500 text-white">
            {address ? "Cập nhật địa chỉ" : "Lưu địa chỉ"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="ml-2 p-2 bg-gray-500 text-white"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
