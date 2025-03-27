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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { Edit} from '@mui/icons-material';

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [addError, setAddError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: ''});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState({ id: null, name: '' });
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

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!editingCategory.name.trim()) {
      setError('Tên không được để trống');
      setOpenEditDialog(false);
      return;
    }
  
    // Kiểm tra trùng tên (loại trừ category đang edit)
    const isExist = categories.some(
      category => 
        category.id !== editingCategory.id && 
        category.name.trim().toLowerCase() === editingCategory.name.trim().toLowerCase()
    );
  
    if (isExist) {
      setError('Tên nhà cung cấp đã tồn tại');
      setOpenEditDialog(false);
      return;
    }
  
    try {
      await api.put(`/phone/category/${editingCategory.id}?name=${encodeURIComponent(editingCategory.name)}`);
      fetchCategories(); // Load lại danh sách
      setOpenEditDialog(false);
      setSnackbar({ open: true, message: 'Cập nhật thành công!' });
    } catch (err) {
      setError('Cập nhật thất bại');
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
        <h1 className="text-2xl font-bold">Quản lý nhà cung cấp</h1>
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
              <TableCell className="font-bold">Cập nhật nhà cung cấp</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {categories.map((value, index) => (
              <TableRow
                key={value.id}
                className="hover:bg-gray-100 even:bg-gray-50"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>
                <IconButton
                  onClick={() => {
                    setEditingCategory({ id: value.id, name: value.name });
                    setOpenEditDialog(true);
                  }}
                  color="primary"
                >
                  <Edit />
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

      {/* Dialog cập nhật */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Cập nhật nhà cung cấp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên nhà cung cấp"
            type="text"
            fullWidth
            variant="outlined"
            value={editingCategory.name}
            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button 
            onClick={handleUpdate}
            variant="contained" 
            color="primary"
            disabled={!editingCategory.name.trim()}
          >
            Cập nhật
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