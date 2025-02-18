import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AddCategoryButton from './addCategoryButton';
const CategoriesTable = () => {
    const [getCategory, setCategory] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
        const result = await axios.get("http://localhost:8080/phone/category");
        setCategory(result.data);
        }
        getCategory();
    },[])
    return (
        <>
        <ul>
            {getCategory.map((value) => <li key={value.id}>{value.name}</li>)}
        </ul>
        <AddCategoryButton />
        </>
    )

        
}
    
export default CategoriesTable




