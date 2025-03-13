// import { useState, useEffect } from 'react';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import { IconButton, Dialog, Button } from '@mui/material';
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
// import GoodsReceipts from './GoodsReceiptForm';
// import api from '../../../services/api'

// const size = 6;

// export default function StockTable() {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [stockData, setStockData] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [openCreateForm, setOpenCreateForm] = useState(false);

//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const response = await api.get(
//           `/phone/stock?page=${currentPage}&size=${size}`
//         );
//         const data = await response.json();
//         setStockData(response.data.content); // Giả định API trả về dạng phân trang Spring
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         console.error("Error fetching stock data:", error);
//       }
//     };
//     fetchStockData();
//   }, [currentPage]);

//   // Flatten dữ liệu để hiển thị từng item
//   const flattenedData = stockData.flatMap(stock => 
//     stock.stockItemResponseDTO.map(item => ({
//       ...item,
//       employeeName: stock.employeeName
//     }))
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Quản lý kho</h1>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setOpenCreateForm(true)}
//         >
//           Nhập kho
//         </Button>
//       </div>

//       <TableContainer component={Paper} className="shadow-lg">
//         <Table className="w-full">
//           <TableHead className="bg-gray-50">
//             <TableRow>
//               <TableCell className="font-bold">#</TableCell>
//               <TableCell className="font-bold">Người nhập</TableCell>
//               <TableCell className="font-bold">Tên sản phẩm</TableCell>
//               <TableCell className="font-bold">Phiên bản</TableCell>
//               <TableCell className="font-bold">Số lượng</TableCell>
//               <TableCell className="font-bold">Giá nhập</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {flattenedData.map((item, index) => (
//               <TableRow key={item.id} className="hover:bg-gray-100 even:bg-gray-50">
//                 <TableCell>{currentPage * size + index + 1}</TableCell>
//                 <TableCell>{item.employeeName}</TableCell>
//                 <TableCell>{item.productName}</TableCell>
//                 <TableCell>{item.variantName}</TableCell>
//                 <TableCell>{item.quantity}</TableCell>
//                 <TableCell>{item.priceAtStock.toLocaleString()} VND</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination - Điều chỉnh dựa trên totalPages */}
//       <div className="flex items-center justify-center py-4 border-t border-gray-200">
//         <div className="flex items-center gap-2">
//           <IconButton 
//             onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
//             disabled={currentPage === 0}
//           >
//             <ArrowBack />
//           </IconButton>

//           <span className="text-lg font-medium">
//             {currentPage + 1} / {totalPages}
//           </span>

//           <IconButton 
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
//             disabled={currentPage >= totalPages - 1}
//           >
//             <ArrowForward />
//           </IconButton>
//         </div>
//       </div>

//       <Dialog open={openCreateForm} onClose={() => setOpenCreateForm(false)}>
//         <GoodsReceipts 
//           onSuccess={() => {
//             setOpenCreateForm(false);
//             setCurrentPage(0); // Refresh lại trang đầu sau khi tạo mới
//           }} 
//         />
//       </Dialog>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton, Dialog, Button } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import GoodsReceipts from './GoodsReceiptForm';

const size = 6;

export default function StockTable() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stockData, setStockData] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/phone/stock?page=${currentIndex}&size=${size}`
        );
        const data = await response.json();
        setStockData(data.content); // Giả định API trả về dạng phân trang Spring

        // Xử lý maxIndex để ngăn chặn phân trang vượt quá giới hạn
        if (data.content.length < size) {
          setMaxIndex(currentIndex);
        } else {
          setMaxIndex(currentIndex + 1); // Cho phép phân trang tiếp nếu dữ liệu đủ
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchStockData();
  }, [currentIndex]);

  // Flatten dữ liệu để hiển thị từng item
  const flattenedData = stockData.flatMap(stock => 
    stock.stockItemResponseDTO.map(item => ({
      ...item,
      employeeName: stock.employeeName
    }))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý kho</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateForm(true)}
        >
          Nhập kho
        </Button>
      </div>

      {/* Inventory Table */}
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="w-full">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold">#</TableCell>
              <TableCell className="font-bold">Người nhập</TableCell>
              <TableCell className="font-bold">Tên sản phẩm</TableCell>
              <TableCell className="font-bold">Phiên bản</TableCell>
              <TableCell className="font-bold">Số lượng</TableCell>
              <TableCell className="font-bold">Giá nhập</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {flattenedData.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-100 even:bg-gray-50">
                <TableCell>{currentIndex * size + index + 1}</TableCell>
                <TableCell>{item.employeeName}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.variantName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.priceAtStock.toLocaleString()} VND</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex items-center justify-center py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <IconButton
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            <ArrowBack />
          </IconButton>

          <span className="text-lg font-medium">{currentIndex + 1}</span>

          <IconButton
            onClick={() => setCurrentIndex(prev => {
              if (maxIndex > 0) return Math.min(prev + 1, maxIndex);
              else return prev + 1;
            })}
            disabled={maxIndex > 0 && currentIndex >= maxIndex}
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>

      {/* Nhập kho Dialog */}
      <Dialog open={openCreateForm} onClose={() => setOpenCreateForm(false)}>
        <GoodsReceipts 
          onSuccess={() => {
            setOpenCreateForm(false);
            setCurrentIndex(0); // Refresh lại trang đầu sau khi tạo mới
          }} 
        />
      </Dialog>
    </div>
  );
}