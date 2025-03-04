import { useState, useEffect } from 'react';
import { ArrowBack, ArrowForward, Inventory } from '@mui/icons-material';
import { IconButton, Dialog, Button } from '@mui/material';
import GoodsReceipts from './GoodsReceipts'
// Dummy data
const products = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  name: `Điện thoại ${String.fromCharCode(65 + i)}`,
  price: (Math.floor(Math.random() * 100) + 50) * 1000,
  stock: Math.floor(Math.random() * 50)
}));

const size = 6;

export default function StockTable() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);

  useEffect(() => {
    // Calculate max page index
    const newMaxIndex = Math.ceil(products.length / size) - 1;
    setMaxIndex(newMaxIndex);
    
    // Update current products
    const start = currentIndex * size;
    const end = start + size;
    setCurrentProducts(products.slice(start, end));
  }, [currentIndex]);

  return (
    <div className="p-4 md:p-6 bg-gray-50 w-full">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý tồn kho</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateForm(true)}
        >
          Nhap kho
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tên sản phẩm</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Giá</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tồn kho</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">#{product.id.toString().padStart(3, '0')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-600">
                    {product.stock} sản phẩm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
            
            <span className="text-lg font-medium">{currentIndex + 1}</span>
            
            <IconButton
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, maxIndex))}
              disabled={currentIndex >= maxIndex}
              className="hover:bg-gray-100"
            >
              <ArrowForward className="text-gray-600" />
            </IconButton>
          </div>

          <Dialog
        open={openCreateForm}
        onClose={() => setOpenCreateForm(false) } products={products}
        maxWidth="md"
        fullWidth
      >
        <GoodsReceipts open={openCreateForm}
          handleClose={() => setOpenCreateForm(false)} 
          onSuccess={() => {
            setOpenCreateForm(false);
          }
        }
        />
      </Dialog>

        </div>
      </div>
    </div>
  );
}