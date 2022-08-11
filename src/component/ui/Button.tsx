import React from 'react';

interface ButtonProps {
  color: string;
  title: string;
  size: string;
  onClick: (arg: any) => any;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ color, title, size, onClick, className, disabled }) => {
  return (
    <button
      className={`${color} rounded py-1 px-2 ${size} text-white hover:shadow-md transition-all ${className}`}
      onClick={onClick}
      disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
