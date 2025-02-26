import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, CircularProgress, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
// import api from '../../../services/api'
import axios from 'axios'
const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/phone/category");
        setCategories(response.data.data);
        setTotalPages(response.data.totalPages);
        setError('');
      } catch (err) {
        setError('Không thể tải dữ liệu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [currentPage]);

  // Xử lý xóa nhà cung cấp
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/phone/category/${id}`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (err) {
      console.error('Xóa thất bại:', err);
    }
  };

  // Xử lý phân trang
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý Nhà cung cấp</h1>
      
      <TableContainer component={Paper} className="shadow-lg rounded-lg">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell className="font-bold">STT</TableCell>
                <TableCell className="font-bold">Tên nhà cung cấp</TableCell>
                <TableCell className="font-bold">Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.id} hover>
                  <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => {
                        if (window.confirm('Bạn chắc chắn muốn xóa?')) {
                          handleDelete(category.id);
                        }
                      }}
                      color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
  
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    );
  };
  
  export default CategoryList;