import React from 'react';

interface BoxesListProps {
  children: React.ReactNode;
}

const BoxesList: React.FC<BoxesListProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto p-3">
      <ul className="flex justify-center items-start w-fit ml-auto mr-auto">{children}</ul>
    </div>
  );
};

export default BoxesList;
