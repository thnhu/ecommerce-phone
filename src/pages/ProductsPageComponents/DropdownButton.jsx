import React, { useState } from "react";

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState("Latest");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    setIsOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="relative text-left dropdown hidden md:inline-block z-40">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-[120px] lg:w-[200px] px-4 py-2 lg:px-5 p-font text-[12px] md:text-[16px] lg:text-[20px] bg-white border border-gray-300 rounded-[62px] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {currentMode} {/* Display the current mode */}
        <svg
          className={`ml-2 w-5 md:h-4 lg:h-5 mt-1 ${isOpen ? "rotate-90" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-[200px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
          isOpen ? "block" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdownButton"
        style={{ zIndex: 50 }}
      >
        <div className="py-1">
          <button
            className="text-gray-700 block px-4 w-full py-2 p-font text-[10px] md:text-[14px] lg:text-[18px]"
            onClick={() => handleModeChange("Latest")}
          >
            Latest
          </button>
          <button
            className="text-gray-700 block px-4 w-full py-2 p-font text-[10px] md:text-[14px] lg:text-[18px]"
            onClick={() => handleModeChange("Oldest")}
          >
            Oldest
          </button>
          <button
            className="text-gray-700 block px-4 w-full py-2 p-font text-[10px] md:text-[14px] lg:text-[18px]"
            onClick={() => handleModeChange("Highest")}
          >
            Highest
          </button>
          <button
            className="text-gray-700 block px-4 w-full py-2 p-font text-[10px] md:text-[14px] lg:text-[18px]"
            onClick={() => handleModeChange("Lowest")}
          >
            Lowest
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownButton;
