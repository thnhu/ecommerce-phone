import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import api from "../services/api";
import { IconButton } from "@mui/material";
import { ContactMail, CreditCard } from "@mui/icons-material";
import LogoutButton from "../Components/LogoutButton";
import InfoTab from "../Components/PersonalPage/InfoTab";
import BillTab from "../Components/PersonalPage/BillTab";

const SideBar = ({ userData, setSelectedTab }) => {
  return (
    <div className="w-full sm:w-3/12 p-4 bg-blue-200 p-font">
      <p className="lg:text-2xl p-5">
        Khách hàng <span className="font-bold">{userData.displayName}</span>
      </p>
      <div>
        <div
          className="flex items-center rounded hover:cursor-pointer px-3 hover:bg-slate-400 select-none"
          onClick={() => setSelectedTab("thongtincanhan")}
        >
          <ContactMail />
          <p className="text-xl p-2 pl-5">Thông tin cá nhân</p>
        </div>
        <div
          className="flex items-center rounded hover:cursor-pointer px-3 hover:bg-slate-400 select-none mt-3"
          onClick={() => setSelectedTab("donhangdamua")}
        >
          <CreditCard />
          <p className="text-xl p-2 pl-5">Đơn hàng đã mua</p>
        </div>
        <LogoutButton style="bg-white w-full p-3 text-xl mt-3 border border-slate-800"></LogoutButton>
      </div>
    </div>
  );
};


const PersonalPage = () => {
  const [userData, setUserData] = useState({});
  // const [selectedTab, setSelectedTab] = useState("thongtincanhan");
  const [selectedTab, setSelectedTab] = useState("donhangdamua");

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await api.get("/phone/user/myInfo");
        console.log(response.data);
        setUserData(() => ({ ...response.data }));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("User not found. Please log in.");
        } else {
          console.log("An unexpected error occurred.");
        }
      }
    };
    fetchPersonalInfo();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-wrap p-5">
        <SideBar userData={userData} setSelectedTab={setSelectedTab}></SideBar>
        {selectedTab == "thongtincanhan" ? (
          <InfoTab userData={userData}></InfoTab>
        ) : selectedTab == "donhangdamua" ? (
          <BillTab userData={userData}></BillTab>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default PersonalPage;
