import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {

  const [addProduct, setAddProduct] = useState({
    name: "",
    description: "",
    category: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token không tồn tại. Hãy đăng nhập lại.");
      return;
    }

    // Kiểm tra file ảnh
    // if (!file) {
    //   setMessage('Vui lòng chọn ảnh sản phẩm.');
    //   return;
    // }

    // Tạo FormData với 2 key: product (JSON) và files (file ảnh)
    const formData = new FormData();
    // const productData = {
    //   name,
    //   description,
    //   category,
    // };

    // formData.append('product', JSON.stringify(productData));
    //formData.append('files', file);

    try {
      const response = await axios.post("http://localhost:8080/phone/product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setMessage('Sản phẩm đã được tạo thành công!');
      // Reset form
      //setAddProduct
      // setFile(null);
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage('Có lỗi xảy ra khi tạo sản phẩm.');
    }
  };

  return (
    <>
      <div>
        <h1>Tạo sản phẩm</h1>
        <form onSubmit={handleAddProduct}>
          <div>
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              value={addProduct.name}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div>
            <label>Mô tả sản phẩm:</label>
            <textarea
              value={addProduct.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>
          <div>
            <label>Tên nhà cung cấp:</label>
            <input
              type="text"
              value={addProduct.category}
              onChange={handleInputChange}
              placeholder="Nhập tên nhà cung cấp"
            />
          </div>
          {/* <div>
            <label>Ảnh sản phẩm:</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              required
            />
          </div> */}
          <button type="submit" onClick={handleAddProduct}>Thêm sản phẩm</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
      

  );
  
};

export default CreateProduct;
