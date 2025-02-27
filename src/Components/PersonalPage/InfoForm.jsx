import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const InfoForm = ({ onSubmit, onCancel, userData }) => {
  const defaultUserData = {
    displayName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
    avatar: null,
  };

  const [formData, setFormData] = useState(defaultUserData);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
      setAvatar(userData.avatar);
    } else {
      setFormData(defaultUserData);
      setAvatar(null);
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file ? URL.createObjectURL(file) : "No file selected");
    setFormData((prevState) => ({
      ...prevState,
      avatar: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-4 border relative size-full">
      <div className="absolute top-2 right-2 z-10">
        <IconButton onClick={onCancel} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>

      <h2 className="text-lg font-bold lg:text-2xl">
        Sửa Thông Tin Người Dùng
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 lg:flex items-center justify-center mt-3 gap-5">
          <div className="mt-2">
            {avatar && avatar !== "No file selected" ? (
              <img
                src={avatar}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <label className="block">Tên hiển thị:</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        <div>
          <label className="block">Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        <div>
          <label className="block">Số điện thoại:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        <div>
          <label className="block">Ngày sinh:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full p-2 border mt-2 md:mb-5"
            required
          />
        </div>

        <div className="flex mt-4">
          <button type="submit" className="p-2 bg-blue-500 text-white">
            {userData ? "Cập nhật thông tin" : "Lưu thông tin"}
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

export default InfoForm;
