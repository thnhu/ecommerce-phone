import React, {useEffect, useState} from 'react';
import AddCategoryButton from './AddCategoryButton';
import DeleteCategoryButton from './DeleteCategoryButton';
import api from '../../../services/api';
const CategoriesTable = () => {
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
          const response = await api.get("/phone/category");
          setCategories(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh mục:', error);
        }
      };
    
      useEffect(() => {
        fetchCategories();
      }, []);
    
    return (
        <>
       <div> 
      <h2>Danh sách nhà cung cấp</h2>
      <ul>
        {categories.map((value) => (
          <li key={value.id}>
            {value.name}
            <DeleteCategoryButton 
              categoryId={value.id} 
              onDeleteSuccess={fetchCategories} 
            />
          </li>
        ))}
      </ul>
    </div>
        <AddCategoryButton />
        </>
    )

        
}
    
export default CategoriesTable




