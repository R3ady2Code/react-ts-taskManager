import React from 'react';

interface Props {
  onClick: () => any;
}

export const CreateBoxBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="text-9xl font-black px-16 py-44 cursor-pointer text-slate-300 hover:text-slate-500 transition-all">
      +
    </div>
  );
};
