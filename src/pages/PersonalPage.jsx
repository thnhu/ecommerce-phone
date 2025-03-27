import React, { useEffect, useState } from "react";
import Navbar from "../Components/UserPageComponents/Navbar.jsx";
import Footer from "../Components/UserPageComponents/Footer.jsx";
import api from "../services/api";
import { IconButton } from "@mui/material";
import { ContactMail, CreditCard } from "@mui/icons-material";
import LogoutButton from "../Components/UserPageComponents/LogoutButton.jsx";
import InfoTab from "../Components/PersonalPage/InfoTab";
import BillTab from "../Components/PersonalPage/BillTab";

const SideBar = ({ userData, setSelectedTab }) => {
  return (
    <div className="w-full sm:w-3/12 py-4 px-10 p-font">
      <p className="lg:text-2xl p-5">
        Khách hàng <span className="font-bold">{userData.displayName}</span>
      </p>
      <div>
        <div
          className="flex items-center rounded hover:cursor-pointer px-3 hover:bg-slate-200 select-none"
          onClick={() => setSelectedTab("thongtincanhan")}
        >
          <ContactMail />
          <p className="text-xl p-2 pl-5">Thông tin cá nhân</p>
        </div>
        <div
          className="flex items-center rounded hover:cursor-pointer px-3 hover:bg-slate-200 select-none mt-3"
          onClick={() => setSelectedTab("donhangdamua")}
        >
          <CreditCard />
          <p className="text-xl p-2 pl-5">Đơn hàng đã mua</p>
        </div>
        <LogoutButton style="bg-white hover:bg-slate-400 w-full p-3 text-xl mt-3 border border-slate-800"></LogoutButton>
      </div>
    </div>
  );
};

const PersonalPage = () => {
  const [userData, setUserData] = useState({});
  // const [selectedTab, setSelectedTab] = useState("thongtincanhan");
  const [selectedTab, setSelectedTab] = useState("donhangdamua");

  const fetchPersonalInfo = async () => {
    try {
      const response = await api.get("/phone/user/myInfo");
      setUserData(() => ({ ...response.data }));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Không tìm thấy người dùng.");
      } else {
        console.log("Lỗi không xác định.");
      }
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap p-5 mt-20">
        <SideBar userData={userData} setSelectedTab={setSelectedTab}></SideBar>
        {selectedTab == "thongtincanhan" ? (
          <InfoTab
            userData={userData}
            fetchPersonalInfo={fetchPersonalInfo}
          ></InfoTab>
        ) : selectedTab == "donhangdamua" ? (
          <BillTab userData={userData}></BillTab>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default PersonalPage;
