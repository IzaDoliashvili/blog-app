import React from 'react';
import { Link } from 'react-router-dom';
import {ModeToggle} from '../components/mode-toggle'

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-white">BitBlogs</div>
      <nav className="space-x-4 text-white">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/write" className="hover:text-gray-400">Write</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>
      </nav>
      <div className="space-x-4">
        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Sign In</button>
      </div>
      <div>
        <ModeToggle />
      </div>
    </header>
  );
};
