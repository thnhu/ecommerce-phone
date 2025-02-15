import axios from "axios";
import React, {useEffect, useState} from "react";
const CategoriesTable = () => {
    const [getCategory, setCategory] = useState([]);
    useEffect(() => {
    const getAPI = async () => {
      const result = await axios.get("http://localhost:8080/phone/category");
      setCategory(result.data);
    }
        getAPI();
    },[])
  return (
    <>
      <ul>
        {getCategory.map((value) => <li key={value.id}>{value.name}</li>)}
      </ul>
    </>
  )

        }
    
    


export default CategoriesTable


