import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [addError, setAddError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/phone/category");
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải danh sách nhà cung cấp');
      setLoading(false);
    }
  };


  //Hàm kiểm tra nhà cung cấp đã tồn tại
  const checkCategoryExists = (name) => {
    return categories.some(category =>
      category.name.trim().toLowerCase() === name.trim().toLowerCase()
    )
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      setError('Tên không được để trống');
      setOpenAddDialog(false);
      return;
      }

    if (checkCategoryExists(newCategory.trim())) {
      setError('Tên nhà cung cấp đã tồn tại');
      setOpenAddDialog(false);
      return;
      }

    try {
      const response = await api.post("/phone/category",{ name: newCategory }
      );
      fetchCategories();
      setCategories([response.data, ...categories]);
      handleCloseDialog();
      setSnackbar({ open: true, message: 'Thêm thành công!' });
    } catch (err) {
      setError('Thêm mới thất bại');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      try {
        await api.delete(`/phone/category/${id}`);
        setCategories(categories.filter(category => category.id !== id));
        setSnackbar({ open: true, message: 'Xóa thành công!' });
      } catch (err) {
        setError('Xóa thất bại');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setNewCategory("");
    setAddError("");
  };

  const handleOpenDialog = () => {
    setOpenAddDialog(true);
    setNewCategory("");
    setAddError("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý Nhà cung cấp</h1>
        <Button
          variant="contained"
          onClick={handleOpenDialog}
        >
          Thêm nhà cung cấp
        </Button>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <TableContainer component={Paper} className="shadow-lg">
        <Table className="w-full">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold">#</TableCell>
              <TableCell className="font-bold">Tên nhà cung cấp</TableCell>
              <TableCell className="font-bold">Xóa nhà cung cấp</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {categories.map((value, index) => (
              <TableRow
                key={value.name}
                className="hover:bg-gray-100 even:bg-gray-50"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(value.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {categories.length === 0 && !loading && (
        <div className="text-center mt-4 text-gray-500">
          Không có dữ liệu hiển thị
        </div>
      )}

      {/* Dialog thêm mới */}
      <Dialog open={openAddDialog} 
      onClose={handleCloseDialog}
      >
        <DialogTitle>Thêm nhà cung cấp mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên nhà cung cấp"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
              setError("");
            }}
            className="mt-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button 
            onClick={handleAddCategory}
            variant="contained" 
            color="primary"
            disabled={!newCategory.trim()}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{vertical:'top', horizontal:'center'}}
      >
        <Alert severity="success" sx={{ width: '100%'}}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoriesTable;