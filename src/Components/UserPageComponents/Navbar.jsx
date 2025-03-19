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
  const [isSearching, setIsSearching] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({});
  const [cartQuantity, setCartQuantity] = useState();
  //Tracking the change of token
  const [tokenTracker, setTokenTracker] = useState(
    localStorage.getItem("authToken")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [products, setProducts] = useState([]);

  const navLinks = [
    { title: "Trang chủ", path: "/" },
    { title: "Giảm giá", path: "/promotion" },
    { title: "Hàng mới về", path: "/newarrivals" },
    { title: "Thương hiệu", path: "/category" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => console.log(isSearching), [isSearching]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout if any
    }

    // Set a new debounce timeout for the search query
    const timeoutId = setTimeout(() => {
      fetchProducts(searchQuery);
    }, 500); // 500ms debounce delay

    setDebounceTimeout(timeoutId); // Store the timeout ID for future cleanup

    // Cleanup the timeout when the component is unmounted or search query changes
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchProducts = async (query) => {
    if (!query) {
      setProducts([]);
      return;
    }
    try {
      const response = await api.get(`/phone/product/search?name=${query}`);
      setProducts(response.data.slice(0, 3)); // Set the search results
    } catch (error) {
      console.error("Lỗi sản phẩm", error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setTokenTracker(localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorageChange);

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
        setUserData({});
      }
    };
    fetchData();
  }, [tokenTracker]);

  // useEffect(() => console.log(userData), [userData]);

  // Tracking of quantity. Need to modify for adding cart and change quantity
  useEffect(() => {
    const fetchCart = async () => {
      if (userData) {
        try {
          const cartResponse = await api.get(`/phone/cart/${userData.id}`);
          setCartQuantity(cartResponse.data.data.items.length);
        } catch (e) {
          // console.log("Lỗi giỏ hàng" + e);
        }
      }
    };
    fetchCart();
  }, []);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <IconButton
              edge="start"
              className="sm:block md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu />
            </IconButton>
            <a href="/">
              <span className="text-xl font-bold text-gray-800">
                DIDONGVERSE
              </span>
            </a>
          </div>

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

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
              <Search className="text-gray-500" />
              <InputBase
                placeholder="Bạn muốn tìm gì..."
                className="ml-2"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Render product images absolutely positioned */}
            {products && isSearchOpen && (
              <div className="absolute top-full right-0 w-1/3 bg-white shadow-lg z-10 rounded-b-xl">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-4 hover:bg-gray-100 rounded-xl"
                  >
                    <img
                      src={`data:image/*;base64,${product.images[0].data}`}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <h3 className="md:ml-5 md:text-lg text-sm font-semibold text-center">
                      {product.name}
                    </h3>
                  </div>
                ))}
              </div>
            )}
            <div
              className={`${
                isSearchOpen ? `bg-gray-100 rounded-full` : `bg-white`
              }`}
            >
              <IconButton
                className="sm:block md:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                sx={() => {return isSearchOpen}, { color: "black" }}
              >
                <Search />
              </IconButton>
            </div>

            {/* Cart */}
            {Object.keys(userData).length > 0 &&
              userData.role.name === "USER" && (
                <a href="/cart">
                  <IconButton>
                    <Badge
                      badgeContent={cartQuantity}
                      color={`${cartQuantity > 0 ? "error" : null}`}
                    >
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
              <Link
                to={
                  userData.role.name === "ADMIN"
                    ? "/admin"
                    : userData.role.name === "STAFF"
                    ? "/staff"
                    : "/user"
                }
              >
                <div className="w-9 h-9 overflow-hidden rounded-lg">
                  <img
                    src={
                      userData?.avatar?.data
                        ? `data:image/*;base64,${userData.avatar.data}`
                        : defaultAvatar
                    }
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="text-gray-500" />
              <InputBase
                placeholder="Tìm kiếm..."
                className="ml-2 flex-1"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        )}

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
