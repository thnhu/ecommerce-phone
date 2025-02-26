// CategoryList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCategories, 
  addCategory, 
  deleteCategory 
} from '../../../redux/slices/categorySlice';
import { 
  List, 
  ListItem, 
  TextField, 
  Button, 
  CircularProgress,
  IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const [newCategory, setNewCategory] = React.useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory('');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <TextField
        label="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button onClick={handleAddCategory} variant="contained">
        Add Category
      </Button>
      
      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            {category.name}
            <IconButton 
              onClick={() => dispatch(deleteCategory(category.id))}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryList;