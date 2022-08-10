import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-between items-center h-[50px] px-5 shadow-md bg-slate-500 text-white">
      <h3 className="font-bold text-2xl">TS React TaskManager</h3>
      <span className="w-1/6 flex items-center justify-between">
        <Link to="/">Home</Link>
        <Link to="/active">Active</Link>
        <Link to="/completed">Completed</Link>
      </span>
    </div>
  );
};

export default Header;
