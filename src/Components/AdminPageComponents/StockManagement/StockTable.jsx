import { useState, useEffect } from 'react';
import { ArrowBack, ArrowForward, Delete } from '@mui/icons-material';
import { IconButton, Dialog, Button } from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import GoodsReceipts from './GoodsReceiptForm';

// Dummy data
const products = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  user: `Người nhập ${i + 1}`,
  productName: `Điện thoại ${String.fromCharCode(65 + i)}`,
  variantName: `Phiên bản ${i % 3 + 1}`,
  quantity: Math.floor(Math.random() * 50),
  priceAtStock: (Math.floor(Math.random() * 100) + 50) * 1000,
}));

const size = 6;

export default function StockTable() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  // Tính tổng số trang
  const maxIndex = Math.ceil(products.length / size) - 1;

  useEffect(() => {
    // Cập nhật danh sách sản phẩm theo trang hiện tại
    const start = currentIndex * size;
    const end = start + size;
    setCurrentProducts(products.slice(start, end));
  }, [currentIndex, products]);

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
            {currentProducts.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-100 even:bg-gray-50">
                <TableCell>{currentIndex * size + index + 1}</TableCell>
                <TableCell>{item.user}</TableCell>
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
          <IconButton onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="hover:bg-gray-100">
            <ArrowBack className="text-gray-600" />
          </IconButton>

          <span className="text-lg font-medium">{currentIndex + 1} / {maxIndex + 1}</span>

          <IconButton onClick={() => setCurrentIndex(prev => Math.min(prev + 1, maxIndex))}
            disabled={currentIndex >= maxIndex}
            className="hover:bg-gray-100">
            <ArrowForward className="text-gray-600" />
          </IconButton>
        </div>
      </div>

      {/* Nhập kho Dialog */}
      <Dialog open={openCreateForm} onClose={() => setOpenCreateForm(false)} maxWidth="md" fullWidth>
        <GoodsReceipts open={openCreateForm} handleClose={() => setOpenCreateForm(false)}
          onSuccess={() => { setOpenCreateForm(false); }} />
      </Dialog>
    </div>
  );
}

