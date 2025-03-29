import { Link } from "react-router";
import vnpayLogo from "../assets/images/vnpay.png";
const VNPayFail = () => {
  return (
    <div className="w-full h-screen items-center justify-center up flex flex-col gap-2">
      <img src={vnpayLogo} alt="" />
      <span className="inline-block text-xl text-red-400">
        THANH TOÁN THẤT BẠI
      </span>
      <Link className="text-sky-400"> Quay lại trang chủ</Link>
    </div>
  );
};

export default VNPayFail;
