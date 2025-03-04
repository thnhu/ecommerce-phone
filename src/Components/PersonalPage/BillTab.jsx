import React, { useState, useEffect } from "react";

const BillTab = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Tất cả");

  //For testing 
  const proID = "20d51858-313f-43c6-a9d9-cb840dcfe88f"

  useEffect(() => {
    if (userData && userData.addresses) {
      // Once the user data is available, stop loading
      setIsLoading(false);
    }
  }, [userData]);

  if (isLoading) return null;
  console.log(userData);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="w-full sm:w-9/12 p-4 bg-red-300">
        <div className="overflow-x-auto">
          <ul className="flex space-x-2">
            {["Tất cả", "Đang chờ", "Xác nhận", "Đang giao hàng", "Đã giao hàng", "Đã hủy", "Đã hoàn tiền"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded bg-[#F3F4F6] ${selectedTab === tab ? "border-2 border-black" : ""}`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BillTab;
