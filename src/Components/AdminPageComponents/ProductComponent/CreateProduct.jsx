import React, { useState, useEffect, useRef } from 'react';
import api from '../../../services/api';
// import iPhone from "../../../assets/images/iphone-16-pro-titan-sa-mac.png";
// import axios from 'axios';
const CreateProduct = () => {
  //fetchCategories
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

  const [addProduct, setAddProduct] = useState({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState('');

  const [images, setImages] = useState([]);
  // Tạo ref để điều khiển <input type="file"> ẩn
  const fileInputRef = useRef(null);

  // Xử lý khi chọn file
  const handleFilesChange = (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Tạo mảng mới chứa thông tin file + đường dẫn preview
    const newImages = Array.from(selectedFiles).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Thêm vào state
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Khi nhấn nút “+”, click vào input file ẩn
  const handleAddMore = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/phone/product", addProduct, 
      );
      console.log(response.data);
      alert('Sản phẩm đã được tạo thành công!');
      //setAddProduct
      // setFile(null);
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage('Có lỗi xảy ra khi tạo sản phẩm.');
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
        <h2 className="font-bold text-lg mb-4">Thông tin sản phẩm</h2>
        <label className="block text-gray-700">Tên sản phẩm</label>
        <input type="text" 
          className="w-full p-2 border rounded-lg mt-1 mb-4" 
          value={addProduct.name}
          onChange={handleInputChange}
          placeholder="Nhập tên sản phẩm"
          name="name" />
        
        <label className="block text-gray-700">Mô tả sản phẩm</label>
        <textarea 
          className="w-full p-2 border rounded-lg mt-1 mb-4" 
          rows="4"
          value={addProduct.description}
          onChange={handleInputChange}
          placeholder="Nhập mô tả sản phẩm"
          name="description">
        </textarea>
        
        <div>
              <label className="block text-gray-700 mb-1">Nhà cung cấp</label>
              <select className="w-full border rounded p-2">
                {categories.map((value) => (
                  <option key={value.name} value={addProduct.category}>
                    {value.name}
                  </option>
                ))}
              </select>
        </div>
      <h2 className="text-xl font-semibold mb-4">Hình sản phẩm</h2>
      <div className="flex flex-wrap gap-2">
        {/* Hiển thị preview các hình đã chọn */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-20 h-20 border rounded-lg overflow-hidden"
          >
            <img
              src={img.preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Nút thêm hình */}
        <button
          type="button"
          onClick={handleAddMore}
          className="w-20 h-20 border rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          +
        </button>
        {/* Input file ẩn (multiple) */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFilesChange}
          className="hidden"
        />
      </div>

        <button onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 rounded-lg w-full" >
              Thêm
        </button>
      </div>

      {/* <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
        <h2 className="font-bold text-lg mb-4">Giá bán</h2>
        <label className="block text-gray-700">Giá gốc</label>
        <input type="text" 
        className="w-full p-2 border rounded-lg mt-1 mb-4" 
        value={addProduct.price}
        onChange={handleInputChange} />
        
      <label className="block text-gray-700 mb-2">Trạng thái</label>
          <select className="w-full border rounded p-2">
            <option>Active</option>
            <option>Inactive</option>
            <option>Draft</option>
          </select>
      
      </div> */}
      
    </>
  );
  
};

export default CreateProduct;
