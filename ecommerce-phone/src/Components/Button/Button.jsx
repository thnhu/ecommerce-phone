// Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ label, onClick, variant = 'primary', className = '' }) => {
  return (
    <button 
      className={`button ${variant} ${className}`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
