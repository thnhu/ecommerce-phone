import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getRevenueByDate, getRevenueBySummary } from "../../../services/api";

const Revenue = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRevenueByDate();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRevenueBySummary();
        setSummary(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Hàm format tiền tệ
  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="p-5">
      <div className="w-full flex items-center mb-4 gap-3">
        <div className="h-28 w-1/5 bg-white shadow-md rounded-md border-l-4 border-sky-400 p-3">
          <div className="text-blue-500 font-semibold">Doanh thu hôm nay:</div>
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-blue-500">
            {summary.dailyRevenue?.toLocaleString("vi-VN") + " VND"}
          </div>
        </div>
        <div className="h-28 w-1/5 bg-white shadow-md rounded-md border-l-4 border-yellow-400 p-3">
          <div className="text-blue-500 font-semibold">Doanh thu tuần này:</div>
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-blue-500">
            {summary.weeklyRevenue?.toLocaleString("vi-VN") + " VND"}
          </div>
        </div>
        <div className="h-28 w-1/5 bg-white shadow-md rounded-md border-l-4 border-pink-400 p-3">
          <div className="text-blue-500 font-semibold">
            Doanh thu tháng này:
          </div>
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-blue-500">
            {summary.monthlyRevenue?.toLocaleString("vi-VN") + " VND"}
          </div>
        </div>
        <div className="h-28 w-1/5 bg-white shadow-md rounded-md border-l-4 border-green-400 p-3">
          <div className="text-blue-500 font-semibold">Doanh thu năm nay:</div>
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-blue-500">
            {summary.yearlyRevenue?.toLocaleString("vi-VN") + " VND"}
          </div>
        </div>
      </div>
      <div
        className=" flex flex-col items-center"
        style={{ width: "70%", height: 300 }}
      >
        <h2 className="uppercase font-semibold text-blue-500">
          Biểu đồ doanh thu
        </h2>
        <ResponsiveContainer
          style={{ backgroundColor: "white" }}
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              labelFormatter={(date) =>
                new Date(date).toLocaleDateString("vi-VN")
              }
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Revenue;
