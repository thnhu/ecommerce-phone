import React from 'react';
import iPhone from "../../assets/images/iphone-16-pro-titan-sa-mac.png";
function NewArrivals() {
    const products = [
        {
            id: 1,
            name: 'OPPO Find X8 5G 16GB/512GB',
            price: '22.990.000₫',
            rating: '4.5/5',
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
            <h2 className="text-2xl font-bold mb-5">HÀNG MỚI VỀ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-4 text-center">
                        <img src={iPhone} alt={product.name} className="w-full rounded mb-3" />
                        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                        <p className="text-yellow-500 text-sm mb-2">⭐ {product.rating}</p>
                        <p className="text-gray-800 text-lg">
                            {product.price}{' '}
                            {product.originalPrice && (
                                <span className="line-through text-gray-500 text-sm ml-2">{product.originalPrice}</span>
                            )}
                            {product.discount && (
                                <span className="text-red-500 text-sm ml-2">-{product.discount}</span>
                            )}
                        </p>
                    </div>
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
