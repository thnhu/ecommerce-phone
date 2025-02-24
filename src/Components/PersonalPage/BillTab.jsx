import React from "react";
import { useState, useEffect } from "react";

const BillTab = ({ userData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData && userData.addresses) {
      // Once the user data is available, stop loading
      setIsLoading(false);
    }
  }, [userData]);

  if (isLoading) return null;
  console.log(userData);
  return (
    <>
      <div className="w-full sm:w-9/12 p-4 bg-red-300">
        <div>
          <ul>
            <li>Tất cả</li>
            <li>Đang chờ</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BillTab;
