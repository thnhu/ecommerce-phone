import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "./AddressForm.jsx"; // Import the AddressForm component
import InfoForm from "./InfoForm.jsx"; // Import the InfoForm component for editing user info


const InfoTab = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isUserInfoFormVisible, setIsUserInfoFormVisible] = useState(false); // To control user info form visibility
  const [editAddress, setEditAddress] = useState(null); // Store address to edit
  const [editUserData, setEditUserData] = useState(null); // Store user data for editing

  useEffect(() => {
    if (userData && userData.addresses) {
      setIsLoading(false);
    }
  }, [userData]);

  const handleAddClick = () => {
    setEditAddress(null); // Reset editAddress for adding new address
    setIsFormVisible(true);
  };

  const handleEditClick = (address) => {
    setEditAddress(address); // Set the address to be edited
    setIsFormVisible(true);
  };

  const handleEditUserClick = () => {
    setEditUserData(userData); // Set the user data to be edited
    setIsUserInfoFormVisible(true); // Show the user info form
  };

  const handleAddressSubmit = (newAddress) => {
    console.log("Submitted Address:", newAddress);
    // Logic to update the address list goes here
    setIsFormVisible(false); // Hide the form after submission
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setIsUserInfoFormVisible(false); // Hide user info form if canceled
  };

  const handleUserSubmit = (updatedUser) => {
    console.log("Updated User Data:", updatedUser);
    // Logic to update user data goes here
    setIsUserInfoFormVisible(false); // Hide the user info form after submission
  };

  if (isLoading) return null;

  return (
    <div className="w-full sm:w-9/12 p-4 bg-gray-100 border border-black border-opacity-25 rounded-lg">
      <h1 className="p-5 lg:text-2xl font-semibold">THÔNG TIN CÁ NHÂN</h1>
      <div className="border py-5 mb-5 flex items-center justify-between">
        <div className="">
          <p className="lg:text-xl pl-5">
            Khách hàng:{" "}
            <span className="font-bold">{userData.displayName}</span>
          </p>
          {userData.phoneNumber && (
            <p className="pt-2 lg:text-xl pl-5">
              Số điện thoại: {userData.phoneNumber}
            </p>
          )}
          {userData.email && (
            <p className="pt-2 lg:text-xl pl-5">Email: {userData.email}</p>
          )}
        </div>
        <div>
          <IconButton color="black" onClick={handleEditUserClick}>
            <EditIcon />
          </IconButton>
        </div>
      </div>

      {/* Render the user info form when editing */}
      {isUserInfoFormVisible && (
        <div className="p-4 mt-5 bg-white border shadow-md">
          <InfoForm
            onSubmit={handleUserSubmit}
            onCancel={handleCancelForm}
            userData={editUserData} // Pass the user data to be edited
          />
        </div>
      )}

      <h1 className="p-5 lg:text-2xl font-semibold">ĐỊA CHỈ NHẬN HÀNG</h1>

      <div className="border py-1 mb-5">
        {userData.addresses.map((address, index) => {
          const addressParts = [
            address.detail,
            address.ward,
            address.district,
            address.province,
          ]
            .filter((part) => part !== null && part !== undefined)
            .join(", ");

          return (
            <div
              key={index}
              className={`mx-5 flex items-center justify-between border-black border-b text-[18px] ${
                index === userData.addresses.length - 1 ? "border-b-0" : ""
              }`}
            >
              <div className="py-3">
                <p className="font-medium">
                  {address.receiverName} - {address.receiverPhone}
                </p>
                <p>{addressParts}</p>
              </div>
              <IconButton
                color="black"
                onClick={() => handleEditClick(address)}
              >
                <EditIcon />
              </IconButton>
            </div>
          );
        })}

        <div
          className="mx-4 pb-1 flex items-center hover:cursor-pointer select-none"
          onClick={handleAddClick}
        >
          <AddIcon style={{ color: "red" }} />
          <p className="text-red-600 px-2">Thêm địa chỉ</p>
        </div>
      </div>

      {/* Render AddressForm when visible */}
      {isFormVisible && (
        <div className="p-4 mt-5 bg-white border shadow-md">
          <AddressForm
            onSubmit={handleAddressSubmit}
            onCancel={handleCancelForm}
            address={editAddress} // Pass the address to be edited, or null for adding
          />
        </div>
      )}
    </div>
  );
};

export default InfoTab;
