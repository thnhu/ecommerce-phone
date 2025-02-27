import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  Snackbar,
  Alert
} from "@mui/material";
import { Edit, Delete, ArrowBack, ArrowForward } from "@mui/icons-material";
import CreateProductForm from "./CreateProductForm";
import api from "../../../services/api";

const ProductsTable = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const size = 10;
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        api.get(`/phone/product?page=${currentIndex}&size=${size}`),
        api.get("/phone/category")
      ]);

      setProductData(productsRes.data.content);
      setCategories(categoriesRes.data);

      if (productsRes.data.content.length < size) {
        setMaxIndex(currentIndex);
      }
    } catch (error) {
      setError("Lỗi khi tải dữ liệu sản phẩm");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || "Không xác định";
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
        try {
          await api.delete(`/phone/product/${productId}`);
          fetchData();
          setSnackbar({ open: true, message: 'Xóa thành công!', severity:'success' });
        } catch (err) {
          setError('Xóa thất bại');
          setSnackbar({ open: true, message: 'Xóa thất bại!', severity:'error' });
        }
      }
  };

  useEffect(() => {
    fetchData();
  }, [currentIndex]);

  if (loading) return <div className="p-4 text-center">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateForm(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <TableContainer component={Paper} className="shadow-lg">
        <div className="overflow-x-auto">
          <Table className="w-full" aria-label="product table">
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Mô tả</TableCell>
                {/* <TableCell>Giá</TableCell> */}
                {/* <TableCell>Màu sắc</TableCell> */}
                <TableCell>Nhà cung cấp</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Cập nhật</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((product, index) => (
                <TableRow key={product.id} hover>
                  <TableCell>{index + 1 + currentIndex * size}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="max-w-xs">
                    {product.description}
                  </TableCell>
                  {/* <TableCell>
                    {Number(product?.price || 0).toLocaleString()} VNĐ 
                  </TableCell> */}
                  {/* <TableCell>
                    <div 
                      className="w-6 h-6 rounded-full mx-auto"
                      style={{ backgroundColor: product.color }}
                    />
                  </TableCell> */}
                  <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {product.imagePaths?.slice(0, 3).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Hình ${idx + 1}`}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>

      <div className="flex items-center justify-center mt-4 gap-2">
        <IconButton
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          <ArrowBack />
        </IconButton>
        
        <span className="text-lg font-medium">{currentIndex + 1}</span>
        
        <IconButton
          onClick={() => {
            if (maxIndex > 0) {
              setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
            } else {
              setCurrentIndex(prev => prev + 1);
            }
          }}
          disabled={maxIndex > 0 && currentIndex >= maxIndex}
        >
          <ArrowForward />
        </IconButton>
      </div>

      <Dialog
        open={openCreateForm}
        onClose={() => setOpenCreateForm(false)}
        maxWidth="md"
        fullWidth
      >
        <CreateProductForm open={openCreateForm}
          handleClose={() => setOpenCreateForm(false)}
          onSuccess={() => {
            fetchData();
            setOpenCreateForm(false);
          }}
        />
      </Dialog>
                  <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{vertical:'top', horizontal:'center'}}
                  >
                    <Alert severity={snackbar.severity} sx={{ width: '100%'}}>
                      {snackbar.message}
                    </Alert>
                  </Snackbar>
      
    </div>
  );
};

export default ProductsTable;