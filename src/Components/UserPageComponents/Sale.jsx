import React from 'react';
import iPhone from "../../assets/images/iphone-16-pro-titan-sa-mac.png";

function NewArrivals() {
    const products = [
        {
            id: 1,
            name: 'OPPO Find X8 5G 16GB/512GB',
            price: '22.990.000₫',
            rating: '4.5/5',
            discount: '3%',
        },
        {
            id: 2,
            name: 'iPhone 16 Pro',
            price: '28.490.000₫',
            originalPrice: '28.990.000₫',
            discount: '1%',
            rating: '3.5/5',
        },
        {
            id: 3,
            name: 'Samsung Galaxy A16 5G',
            price: '6.990.000₫',
            rating: '4.5/5',
            discount: '5%',
        },
        {
            id: 4,
            name: 'OPPO Reno12 5G 12GB/256GB Hồng',
            price: '11.990.000₫',
            originalPrice: '12.990.000₫',
            discount: '7%',
            rating: '4/5',
        },
    ];

    return (
        <section className="text-center p-5 bg-gray-100">
            <h2 className="text-2xl font-bold mb-5">KHUYẾN MÃI HOT</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                {products.map((product) => (
                    <a key={product.id} href={`/product/${product.id}`} className="block">
                        <div className="relative bg-white rounded-lg shadow-md p-3 text-center h-full flex flex-col justify-between transition-transform transform hover:scale-105 text-sm">
                            {product.discount && (
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Giảm {product.discount}</span>
                            )}
                            <img src={iPhone} alt={product.name} className="w-3/4 mx-auto rounded mb-2" />
                            <h3 className="text-sm font-medium mb-1 min-h-[36px] flex items-center justify-center">{product.name}</h3>
                            <p className="text-yellow-500 text-xs mb-1">⭐ {product.rating}</p>
                            <p className="text-gray-800 text-base font-bold">
                                {product.price}{' '}
                                {product.originalPrice && (
                                    <span className="line-through text-gray-500 text-xs ml-1">{product.originalPrice}</span>
                                )}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
            <button
            className="mt-4 bg-white text-black border border-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
            Xem thêm sản phẩm
            </button>
        </section>
    );
}

export default NewArrivals;
