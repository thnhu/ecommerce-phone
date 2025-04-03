import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { IconButton, Dialog, Button } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import GoodsReceipts from './GoodsReceiptForm';

const size = 6;

export default function StockTable() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


    const fetchStocks = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/phone/stock?page=${currentIndex}&size=${size}`);
        setStocks(response.data.content);
        setTotalPages(response.data.totalPages);
        setError('');
      } catch (err) {
        setError('Không thể tải dữ liệu kho');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStocks();
    }, [currentIndex]);

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

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

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading && <div className="text-center mb-4">Đang tải dữ liệu...</div>}

      {/* Inventory Table */}
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="w-full">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold">#</TableCell>
              <TableCell className="font-bold">Ngày nhập</TableCell>
              <TableCell className="font-bold">Người nhập</TableCell>
              <TableCell className="font-bold">Tên sản phẩm</TableCell>
              <TableCell className="font-bold">Màu</TableCell>
              <TableCell className="font-bold">Số lượng</TableCell>
              <TableCell className="font-bold">Giá nhập</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stocks.flatMap((stock, stockIndex) =>
              stock.stockItemResponseDTO.map((item, itemIndex) => (
                <TableRow 
                  key={item.id} 
                  className="hover:bg-gray-100 even:bg-gray-50"
                >
                  <TableCell>{currentIndex * size + stockIndex + 1}</TableCell>
                  <TableCell>{formatDate(stock.createdAt)}</TableCell>
                  <TableCell>{stock.employeeName}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.variantName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.priceAtStock.toLocaleString()} VND</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex items-center justify-center py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <IconButton 
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="hover:bg-gray-100"
          >
            <ArrowBack className="text-gray-600" />
          </IconButton>

          <span className="text-lg font-medium">
            {currentIndex + 1} / {totalPages}
          </span>

          <IconButton 
            onClick={() => setCurrentIndex(prev => Math.min(prev + 1, totalPages - 1))}
            disabled={currentIndex >= totalPages - 1}
            className="hover:bg-gray-100"
          >
            <ArrowForward className="text-gray-600" />
          </IconButton>
        </div>
      </div>

      {/* Nhập kho Dialog */}
      <Dialog open={openCreateForm} onClose={() => setOpenCreateForm(false)} maxWidth="md" fullWidth>
        <GoodsReceipts 
          open={openCreateForm} 
          handleClose={() => setOpenCreateForm(false)}
          onSuccess={() => {
            fetchStocks();
            setOpenCreateForm(false);
         }}
        />
      </Dialog>
    </div>
  );
}