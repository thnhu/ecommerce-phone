import { useEffect, useState } from "react";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Search } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import api from "../../services/api";
// import api from "../../interceptor"

const SearchBar = ({
  style,
  fetchData = () => console.log("HI"),
  searchQuery,
  setSearchQuery,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    setDebounceTimeout(timeoutId);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div style={style}>
      {isSearchOpen && (
        <div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
              <Search className="text-gray-500" />
              <InputBase
                placeholder="Nhập số điện thoại"
                className="ml-2"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DialogTable = ({ open, handleClose, searchQuery, selectedUser }) => {
  const [orders, setOrders] = useState([]);

  const fetchDataOrder = async () => {
    try {
      const response = await api.get(
        `/phone/order?status=DELIVERED&pageNumber=0&pageSize=10&userId=${selectedUser.id}`
      );
      setOrders(response.data.content);
    } catch (error) {
      console.log("Error fetching orders: ", error);
    }
  };

  useEffect(() => console.log(orders), [orders]);

  useEffect(() => {
    if (selectedUser) {
      fetchDataOrder();
    }
  }, [selectedUser]); // ✅ Fetch orders when selectedUser changes

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Đơn hàng của người dùng{" "}
        <strong>{selectedUser?.displayName || "Unknown"}</strong>
      </DialogTitle>
      <DialogContent>
        {orders.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 border border-gray-300 p-3">
            <div className="font-semibold bg-gray-200 p-3 text-center border-b flex items-center justify-center">
              ID đơn hàng
            </div>
            <div className="font-semibold bg-gray-200 p-3 text-center border-b flex items-center justify-center">
              Tổng giá
            </div>
            <div className="font-semibold bg-gray-200 p-3 text-center border-b flex items-center justify-center">
              Ngày đặt hàng
            </div>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <div className="border p-3 text-center flex items-center justify-center">
                  {order.orderId}
                </div>
                <div className="border p-3 text-center flex items-center justify-center">
                  {order.totalPrice} vnđ
                </div>
                <div className="border p-3 text-center flex items-center justify-center">
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p>Chưa có đơn hàng.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const UsersTable = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [checkQuery, setCheckQuery] = useState();

  const size = 6;

  const fetchData = async () => {
    if (searchQuery === "") {
      try {
        const response = await api.get(
          `/phone/user?page=${currentIndex}&size=${size}`
        );
        setUserData(response.data.content);
        if (response.data.content.length < size) {
          setMaxIndex(currentIndex);
        }
      } catch (error) {
        alert("Error fetching data ", error);
      }
    } else {
      try {
        const response = await api.get(
          `/phone/user/search?phoneNumber=${searchQuery}`
        );
        setUserData([response.data]);
      } catch (e) {
        console.log("Handle phone search error" + e);
        setCheckQuery("Không tìm thấy người dùng");
      }
    }
  };

  const formatDate = (date) => {
    if (date == null) return "Chưa có";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSearch = (userArg) => {
    setOpen(true); // Open the dialog when search button is clicked
    setSelectedUser(userArg);
  };

  const handleClose = () => {
    setSelectedUser({});
    setOpen(false); // Close the dialog
  };

  useEffect(() => console.log(selectedUser), [selectedUser]);

  useEffect(() => {
    fetchData();
  }, [currentIndex]);

  useEffect(() => {
    setCheckQuery("");
  }, [searchQuery]);

  return (
    <div className="pt-3 md:pt-5 w-full">
      <h1 className="text-xl md:text-xl lg:text-3xl text-gray-600 font-medium md:px-5 px-2 flex items-center justify-center">
        Quản lý danh sách người dùng
      </h1>
      <div className="pt-5 pl-8">
        <p className="text-xl pb-3 hidden md:block">Danh sách người dùng</p>
        <div className="flex justify-end">
          <p className="text-l opacity-80 hidden md:block w-4/5">
            Danh sách toàn bộ người dùng hệ thống
          </p>
          <div className="mr-3">
            <SearchBar
              fetchData={fetchData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedUser={selectedUser}
            ></SearchBar>
            <p className="text-red-500 px-4">{checkQuery}</p>
          </div>
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
          <p className="font-semibold border border-gray-300 p-2 col-span-2 flex items-center justify-center">
            Số điện thoại
          </p>
          <p className="font-semibold border border-gray-300 p-2 hidden md:flex items-center justify-center">
            Lịch sử đặt hàng
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
                  <p className="border border-gray-300 p-2 col-span-2">
                    {user.phoneNumber}
                  </p>
                  <button className="border border-gray-300 hidden md:block pt-1 overflow-auto">
                    <IconButton
                      onClick={() => handleSearch(user)}
                      color="primary"
                    >
                      <SearchIcon />
                    </IconButton>
                  </button>
                  <p className="border border-gray-300 py-2 px-5 hidden md:block text-center text-nowrap">
                    {formatDate(user.dob)}
                  </p>
                </div>
              );
          })}
        </div>

        <DialogTable
          searchQuery={searchQuery}
          open={open}
          handleClose={handleClose}
          selectedUser={selectedUser}
        ></DialogTable>

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
