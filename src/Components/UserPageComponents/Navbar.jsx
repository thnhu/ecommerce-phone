import React, { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../services/api";
import defaultAvatar from "../../assets/images/default-avatar.png";
import {
  Badge,
  IconButton,
  InputBase,
  MenuItem,
  Menu as MuiMenu,
} from "@mui/material";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({});
  //Tracking the change of token
  const [tokenTracker, setTokenTracker] = useState(localStorage.getItem("authToken"))

  const navLinks = [
    { title: "Trang chủ", path: "/" },
    { title: "Giảm giá", path: "/promotion" },
    { title: "Hàng mới về", path: "/newarrivals" },
    { title: "Thương hiệu", path: "/category" },
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      // Update the state whenever the token in localStorage changes
      setTokenTracker(localStorage.getItem("authToken"));
    };

    // Add event listener for storage changes (triggered across all tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/phone/user/myInfo");
        setUserData((prevState) => ({ ...prevState, ...response.data }));
      } catch (e) {
        console.log(e);
        setUserData({})
      }
    };

    fetchData();
  }, [tokenTracker]);

  useEffect(() => console.log(userData), [userData]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <IconButton
              edge="start"
              className="md:hidden " // This ensures the button is hidden on medium and larger screens
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu />
            </IconButton>
            <a href="/">
              <span className="text-xl font-bold text-gray-800">
                THEGIOIDIDONG
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.path}
                className="text-black text-base transition-colors duration-300 hover:text-blue-500"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Input (Desktop) */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
              <Search className="text-gray-500" />
              <InputBase
                placeholder="Bạn muốn tìm gì..."
                className="ml-2"
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            {/* Search Icon (Mobile) */}
            <IconButton
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search />
            </IconButton>

            {/* Cart */}
            {Object.keys(userData).length > 0 && (
              <a href="/cart">
                <IconButton>
                  <Badge badgeContent={1} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </a>
            )}

            {/* Login */}
            {Object.keys(userData).length === 0 && (
              <IconButton onClick={handleProfileMenuOpen}>
                <Person />
              </IconButton>
            )}
            {Object.keys(userData).length > 0 && (
              <Link to="/user">
                {/* <h1 className="font-bold">{userData.displayName}</h1> */}
                {/* <img src={defaultAvatar} alt="" className=""/> */}
                <div className="w-9 h-9 overflow-hidden rounded-lg">
                  <img
                    src={userData.avatar || defaultAvatar}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="text-gray-500" />
              <InputBase
                placeholder="Tìm kiếm..."
                className="ml-2 flex-1"
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.path}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile Dropdown Menu */}
      {Object.keys(userData).length == 0 && (
        <MuiMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <a href="/login">
            <MenuItem className="hover:text-blue-500" onClick={handleMenuClose}>
              Đăng nhập
            </MenuItem>
          </a>
          <a href="/register">
            <MenuItem className="hover:text-blue-500" onClick={handleMenuClose}>
              Đăng ký
            </MenuItem>
          </a>
        </MuiMenu>
      )}
    </nav>
  );
};

export default Navbar;
