import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
function Sale() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/phone/product?page=0&size=5');
                setProducts(response.data.content || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Hàm định dạng tiền tệ
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    return (
        <section className="text-center p-5 bg-gray-100">
            <h2 className="text-2xl font-bold mb-5">KHUYẾN MÃI HOT</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                {products.map((product) => {
                    const variant = product.variants?.[0] || {};
                    const imageUrl = product.images?.[0] || '';
                    const hasDiscount = variant.discount > 0;
                    const originalPrice = variant.price + (variant.price * variant.discount / 100);

                    return (
                        <Link 
                            key={product.id} 
                            to={`/product/${product.id}`}
                            className="block"
                        >
                            <div className="relative bg-white rounded-lg shadow-md p-3 text-center h-full flex flex-col justify-between transition-transform transform hover:scale-105 text-sm">
                                {hasDiscount && (
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        Giảm {variant.discount}%
                                    </span>
                                )}
                                <img 
                                    src={`data:image/*;base64,${imageUrl.data}`} 
                                    alt={product.name} 
                                    className="w-3/4 mx-auto rounded mb-2" 
                                    
                                />
                                <h3 className="text-sm font-medium mb-1 min-h-[36px] flex items-center justify-center">
                                    {product.name}
                                </h3>
                                <p className="text-yellow-500 text-xs mb-1">⭐ {product.rating || 'Chưa có đánh giá'}</p>
                                <p className="text-gray-800 text-base font-bold">
                                    {formatPrice(variant.price)}
                                    {hasDiscount && (
                                        <span className="line-through text-gray-500 text-xs ml-1">
                                            {formatPrice(originalPrice)}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <button
                className="mt-4 bg-white text-black border border-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
                Xem thêm sản phẩm
            </button>
        </section>
    );
}

export default Sale;