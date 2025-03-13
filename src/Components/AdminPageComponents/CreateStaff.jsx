import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
  } from "@mui/material";
export default function CreateStaff() {
  const [staffData, setStaffData] = useState({
    displayName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
  });
  const [avatar, setAvatar] = useState(null); // To hold the upload image
  const [open, setOpen] = useState(true);  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate function
  const validate = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!staffData.displayName.trim()) {
      errors.displayName = "Họ và tên không được để trống";
    }
    if (!staffData.email.trim()) {
      errors.email = "Email không được để trống";
    } else {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(staffData.email)) {
        errors.email = "Email không hợp lệ";
      }
    }
    if (!staffData.phoneNumber.trim()) {
      errors.phoneNumber = "Số điện thoại không được để trống";
    } else if (staffData.phoneNumber.length < 10) {
      errors.phoneNumber = "Số điện thoại phải có ít nhất 10 số";
    }
    if (!staffData.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (staffData.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!staffData.dob) {
      errors.dob = "Ngày sinh không được để trống";
    }
    if (staffData.dob > today) errors.dob = "Ngày sinh không hợp lệ";
    if (!avatar) {
        errors.avatar = "Vui lòng chọn một ảnh";
      }  
    
    return errors;
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/admin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const formData = new FormData();
    formData.append(
      "user",
      new Blob(
        [
          JSON.stringify({
            displayName: staffData.displayName,
            email: staffData.email,
            password: staffData.password,
            phoneNumber: staffData.phoneNumber,
            dob: staffData.dob,
          }),
        ],
        { type: "application/json" }
      )
    );
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await api.post(
        "/phone/user/employee",formData);
      
      alert("Tạo tài khoản nhân viên thành công!");
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 401) {
          setErrors({ general: "Bạn không có quyền thực hiện thao tác này" });
        } else if (error.response.data.message === "User existed!") {
          setErrors({ general: "Tài khoản đã tồn tại!" });
        } else {
          setErrors({ general: "Đã xảy ra lỗi khi tạo tài khoản" });
        }
      } else {
        setErrors({ general: "Không thể kết nối đến server" });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };


  return (
    <>
<div className="pt-20 pb-12">
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ color: "darkgreen" }}>
            Thêm nhân viên mới
          </DialogTitle>
          <DialogContent>
            <div className="p-3">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Họ và tên */}
                <div>
                  <input
                    type="text"
                    name="displayName"
                    value={staffData.displayName}
                    onChange={handleInputChange}
                    placeholder="Họ và tên nhân viên"
                    className="outline-none w-full p-1"
                    style={{ borderBottom: "1px solid #E4E0E1" }}
                  />
                  {errors.displayName && (
                    <p className="text-red-500 text-sm">{errors.displayName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={staffData.email}
                    onChange={handleInputChange}
                    placeholder="Email nhân viên"
                    className="outline-none w-full p-1"
                    style={{ borderBottom: "1px solid #E4E0E1" }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={staffData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Số điện thoại"
                    className="outline-none w-full p-1"
                    style={{ borderBottom: "1px solid #E4E0E1" }}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Mật khẩu */}
                <div>
                  <input
                    type="password"
                    name="password"
                    value={staffData.password}
                    onChange={handleInputChange}
                    placeholder="Mật khẩu"
                    className="outline-none w-full p-1"
                    style={{ borderBottom: "1px solid #E4E0E1" }}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Ngày sinh */}
                <div>
                  <input
                    type="date"
                    name="dob"
                    value={staffData.dob}
                    onChange={handleInputChange}
                    className="outline-none w-full p-1"
                    style={{ borderBottom: "1px solid #E4E0E1" }}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm">{errors.dob}</p>
                  )}
                </div>

                {/* Ảnh đại diện */}
                <div className="mb-4">
              <label className="text-sm text-gray-600">Ảnh đại diện</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
              />
              {errors.avatar && (
                <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>
              )}
            </div>

                {errors.general && (
                  <div className="text-red-500 text-center">
                    {errors.general}
                  </div>
                )}

                <Button
                  type="submit"
                  fullWidth
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    marginTop: "20px",
                  }}
                >
                  Tạo tài khoản
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}