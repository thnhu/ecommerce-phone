import { Link } from "react-router";
import vnpayLogo from "../assets/images/vnpay.png";

const VNPaySuccesss = () => {
  return (
    <div className="w-full h-screen items-center justify-center up flex flex-col gap-2">
      <img src={vnpayLogo} alt="" />
      <span className="inline-block text-xl text-green-400">
        THANH TOÁN THÀNH CÔNG
      </span>
      <Link className="text-sky-400"> Xem đơn hàng</Link>
    </div>
  );
};

export default VNPaySuccesss;
