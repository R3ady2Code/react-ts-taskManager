import React from 'react';

interface ButtonProps {
  color: string;
  title: string;
  size: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ color, title, size, onClick, className }) => {
  return (
    <button
      className={`${color} rounded py-1 px-2 ${size} text-white hover:shadow-md transition-all ${className}`}
      onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
