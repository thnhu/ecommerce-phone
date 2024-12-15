import React from "react";
import "./Section.css";

const brands = [
  { name: "Samsung", image: "" },
  { name: "iPhone", image: "" },
  { name: "Xiaomi", image: "" },
  { name: "Oppo", image: "" },
];

const BrandsCategory = () => {
  return (
    <div className="brand-container">
      {brands.map((style, index) => (
        <div key={index} className="brand-item">
          <img
            src={style.image}
            alt={`${style.name}`}
            className="brand-image"
          />
          <div className="brand-text">{style.name}</div>
        </div>
      ))}
    </div>
  );
};

export default BrandsCategory;
