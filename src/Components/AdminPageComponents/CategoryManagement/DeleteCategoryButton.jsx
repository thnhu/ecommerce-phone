import React from 'react';
import api from '../../../services/api';
const DeleteCategoryButton = ({ categoryId, onDeleteSuccess }) => {
  const handleDeleteCategory = async () => {
    try {
      const response = await api.delete(`/phone/category/${categoryId}`);
      console.log('Xóa nhà cung cấp thành công:', response.data);
      alert("Xóa nhà cung cấp thành công")
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      } catch (error) {
        console.error('Lỗi khi xóa danh mục', error);
        alert('Lỗi khi xóa nhà cung cấp');
      }
    };

  return (
    <button onClick={handleDeleteCategory}>
      Xóa nhà cung cấp
    </button>
  );
};

export default DeleteCategoryButton;
