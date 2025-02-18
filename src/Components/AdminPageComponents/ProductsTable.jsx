import axios from "axios";
import React, {useEffect, useState} from "react";
const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:8080/phone/product?page=0&size=10');
          setProducts(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh mục:', error);
        }
      };
    
      useEffect(() => {
        fetchProducts();
      }, []);
    
    return (
        <>
       {/* <div> 
      <h2>Danh sách thiết bị</h2>
      <ul>
        {products.map((value) => (
          <li key={value.id}>
            {value.name}
            
          </li>
        ))}
      </ul>
    </div> */}

        </>
    )
}
export default ProductsTable


