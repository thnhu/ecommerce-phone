import React from 'react';
import './Button.css';

const Button = ({ variant = 'primary', label, onClick, disabled }) => {
  return (
    <button 
      className={`button ${variant}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
