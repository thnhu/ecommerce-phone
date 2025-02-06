import React from 'react';
import './NewArrivals.css';
import Sprigatito from "../../assets/sampleImages/Sprigatito.png";
import Samsung from "../../assets/images/samsung-galaxy-a16-5g-gold-thumbnew-600x600.jpg";
import iPhone from "../../assets/images/iphone-16-pro-titan-sa-mac.png";
import Button from '../Button/Button';
function NewArrivals() {
    const products = [
        {
            id: 1,
            name: 'OPPO Find X8 5G 16GB/512GB',
            price: '22.990.000₫',
            rating: '4.5/5',
            //image: '../../assets/images/oppo-find-x8-grey-thumb-600x600.jpg',
        },
        {
            id: 2,
            name: 'iPhone 16 Pro',
            price: '28.490.000₫',
            originalPrice: '28.990.000₫',
            discount: '1%',
            rating: '3.5/5',
            //image: '../../assets/images/iphone-16-pro-titan-sa-mac.png',
        },
        {
            id: 3,
            name: 'Samsung Galaxy A16 5G',
            price: '6.990.000₫',
            rating: '4.5/5',
            //image: '../../assets/images/samsung-galaxy-a16-5g-gold-thumbnew-600x600.jpg',
        },
        {
            id: 4,
            name: 'OPPO Reno12 5G 12GB/256GB Hồng',
            price: '11.990.000₫',
            originalPrice: '12.990.000₫',
            discount: '7%',
            rating: '4/5',
            //image: '../../assets/images/oppo-reno12-5g-pink-thumb-600x600.jpg',
        },
    ];

    return (
        <section className="new-arrivals">
            <h2 className="new-arrivals__title">HÀNG MỚI VỀ</h2>
            <div className="new-arrivals__grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={iPhone} alt={product.name} className="product-card__image" />
                        <h3 className="product-card__name">{product.name}</h3>
                        <p className="product-card__rating">⭐ {product.rating}</p>
                        <p className="product-card__price">
                            {product.price}{' '}
                            {product.originalPrice && (
                                <span className="product-card__original-price">{product.originalPrice}</span>
                            )}
                            {product.discount && (
                                <span className="product-card__discount">-{product.discount}</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
            <Button 
                variant="secondary" 
                label="Xem thêm sản phẩm" 
                onClick={() => handleClick('secondary')} 
            />
        </section>
    );
}

export default NewArrivals;
