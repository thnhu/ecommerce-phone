import { Link } from "react-router";
import vnpayLogo from "../assets/images/vnpay.png";

const VNPaySuccesss = () => {
  return (
    <div className="w-full h-screen items-center justify-center up flex flex-col gap-2">
      <img src={vnpayLogo} alt="" />
      <span className="inline-block text-2xl text-green-400 font-semibold">
        THANH TOÁN THÀNH CÔNG
      </span>
      <span className="inline-block font-semibold text-slate-600">
        DIDONGVERSE Chân thành cảm ơn quý khách!
      </span>
      <Link className="text-blue-400 underline"> Xem đơn hàng</Link>
    </div>
  );
};

export default VNPaySuccesss;
