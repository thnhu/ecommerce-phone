import React from "react";
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingCart, Person } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  InputBase,
  MenuItem,
  Menu as MuiMenu,
} from "@mui/material";

const SearchBar = ({ style, fetchData = () => console.log("HI") }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout if any
    }

    // Set a new debounce timeout for the search query
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500); // 500ms debounce delay

    setDebounceTimeout(timeoutId); // Store the timeout ID for future cleanup

    // Cleanup the timeout when the component is unmounted or search query changes
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
                placeholder="Bạn muốn tìm gì..."
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

export default SearchBar;
