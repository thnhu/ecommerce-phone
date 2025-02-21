import React from 'react';
import api from '../../../services/api';
const DeleteCategoryButton = ({ categoryId, onDeleteSuccess }) => {
  const handleDeleteCategory = async () => {
    try {
      const response = await api.delete(`/phone/category/${categoryId}`);
      console.log('Xóa nhà cung cấp thành công:', response.data);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
      }
    };

  return (
    <button onClick={handleDeleteCategory}>
      Xóa danh mục
    </button>
  );
};

export default DeleteCategoryButton;
