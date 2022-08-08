import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './component/Header';
import Home from './pages/Home';
import Completed from './pages/Completed';
import Active from './pages/Active';

function App() {
  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/active" element={<Active />} />
      </Routes>
    </div>
  );
}

export default App;
