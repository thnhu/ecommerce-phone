import React, { useState, useEffect, useRef } from 'react';
import api from '../../../services/api';
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

  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: ""
  });

  const [files, setFiles] = useState([]);
  // Tạo ref để điều khiển <input type="file"> ẩn
  const fileInputRef = useRef(null);

  // Xử lý khi chọn file
  const handleFilesChange = (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Tạo mảng mới chứa thông tin file + đường dẫn preview
    const newFiles = Array.from(selectedFiles).map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    // Thêm vào state
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Khi nhấn nút “+”, click vào input file ẩn
  const handleAddMore = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Thêm product object dưới dạng JSON string
    formData.append('product', JSON.stringify(product));

    // Thêm từng img vào key 'files'
    files.forEach((file) => {
      formData.append('files', file.file); 
    });
    // Debug: Kiểm tra dữ liệu trước khi gửi
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
    try {
      const response = await api.post("/phone/product", formData);
      console.log(response.data);
      alert('Sản phẩm đã được tạo thành công!');
      setProduct({
        productName: "",
        description: "",
        categoryId: "",
      });
      setFiles([]);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Có lỗi xảy ra khi tạo sản phẩm.');
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-6 rounded-2xl shadow-md">
        <h2 className="font-bold text-lg mb-4">Thông tin sản phẩm</h2>
        <label className="block text-gray-700">Tên sản phẩm</label>
        <input type="text" 
          className="w-full p-2 border rounded-lg mt-1 mb-4" 
          value={product.name}
          onChange={handleInputChange}
          placeholder="Nhập tên sản phẩm"
          name="name" />
        
        <label className="block text-gray-700">Mô tả sản phẩm</label>
        <textarea 
          className="w-full p-2 border rounded-lg mt-1 mb-4" 
          rows="4"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Nhập mô tả sản phẩm"
          name="description">
        </textarea>
        
        <div>
              <label className="block text-gray-700 mb-1">Nhà cung cấp</label>
              <select className="w-full border rounded p-2"
              name="categoryId"
              value={product.categoryId}
              onChange={handleInputChange}
              required>
                <option value="">Chọn nhà cung cấp</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
        </div>
      <h2 className="text-xl font-semibold mb-4">Hình sản phẩm</h2>
      <div className="flex flex-wrap gap-2">
        {/* Hiển thị preview các hình đã chọn */}
        {files.map((file, idx) => (
          <div
            key={idx}
            className="w-20 h-20 border rounded-lg overflow-hidden"
          >
            <img
              src={file.preview}
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
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full" >
              Thêm
        </button>
      </div>
    </>
  );
  
};

export default CreateProduct;
