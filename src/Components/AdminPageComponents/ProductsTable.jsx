import axios from "axios";
import React, {useEffect, useState} from "react";
const ProductsTable = () => {
    const [getProduct, setProduct] = useState([]);
    useEffect(() => {
        const getProduct = async () => {
        const result = await axios.get("http://localhost:8080/phone/product?page=0&size=10");
        getProduct(result.data);
        }
        getProduct();
    },[])
    return (
        <>
        <ul>
            {getProduct.map((value) => <li key={value.id}>{value.name}</li>)}
        </ul>
        </>
    )
}
export default ProductsTable


