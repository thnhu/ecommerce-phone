import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import api from "../../services/api";
// import api from "../../interceptor"

const UsersTable = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const size = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/phone/user?page=${currentIndex}&size=${size}`
        );
        setUserData(response.data.content);
        //disable over indexing
        if (response.data.content.length < size) {
          setMaxIndex(currentIndex);
        }
      } catch (error) {
        alert("Error fetching data ", error);
      }
    };
    fetchData();
  }, [currentIndex]);

  return (
    <div className="pt-3 md:pt-5 w-full">
      <h1 className="text-xl md:text-xl lg:text-3xl text-gray-600 font-medium md:px-5 px-2 flex items-center justify-center">
        Quản lý danh sách người dùng
      </h1>
      <div className="pt-5 pl-8">
        <p className="text-xl pb-3 hidden md:block">Danh sách người dùng</p>
        <div>
          <p className="text-l opacity-80 hidden md:block">
            Danh sách toàn bộ người dùng hệ thống
          </p>
        </div>
      </div>

      <div className="gap-6 md:pt-6 md:pl-8 px-1 md:px-3">
        <div className="grid grid-cols-5 md:grid-cols-8 text-center">
          <p className="font-semibold border border-gray-300 p-2 flex items-center justify-center">
            #
          </p>
          <p className="font-semibold border border-gray-300 p-2 col-span-2 flex items-center justify-center">
            Tên
          </p>
          <p className="font-semibold border border-gray-300 p-2 col-span-2 hidden md:flex items-center justify-center">
            Email
          </p>
          <p className="font-semibold border border-gray-300 p-2 col-span-2 flex items-center justify-center">
            Số điện thoại
          </p>
          <p className="font-semibold border border-gray-300 py-2 px-5 hidden md:block items-center justify-center">
            Ngày sinh
          </p>
        </div>
        {/* User data */}
        <div className="min-h-[230px] md:min-h-[260px]">
          {userData.map((user, index) => {
            if (index < size)
              return (
                <div
                  className="grid grid-cols-5 md:grid-cols-8 items-center text-sm lg:text-lg"
                  key={index}
                >
                  <p className="border border-gray-300 p-2 text-center">
                    {index + 1 + currentIndex * size}
                  </p>
                  <p className="border border-gray-300 p-2 col-span-2 overflow-auto">
                    {user.displayName}
                  </p>
                  <p className="border border-gray-300 p-2 col-span-2 hidden md:block overflow-auto">
                    {user.email}
                  </p>
                  <p className="border border-gray-300 p-2 col-span-2">
                    {user.phoneNumber}
                  </p>
                  <p className="border border-gray-300 py-2 px-5 hidden md:block text-center">
                    {user.dob == null ? "Chưa cài đặt" : user.dob}
                  </p>
                </div>
              );
          })}
        </div>
        {/* Change index */}
        <div className="flex items-center w-full justify-center px-1 md:px-3">
          <IconButton
            onClick={() =>
              setCurrentIndex((currentIndex) => Math.max(0, currentIndex - 1))
            }
          >
            <ArrowBackIcon />
          </IconButton>
          <p className="p-1 md:p-5 text-sm md:text-lg">{currentIndex + 1}</p>
          <IconButton
            onClick={() =>
              setCurrentIndex((currentIndex) => {
                if (maxIndex > 0) return Math.min(currentIndex + 1, maxIndex);
                else return currentIndex + 1;
              })
            }
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
