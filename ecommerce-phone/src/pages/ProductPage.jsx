import React from 'react';

const ProductPage = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Giá: {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductPage;
