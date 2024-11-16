import React from 'react';
import { Link } from 'react-router-dom';
import {ModeToggle} from '../components/mode-toggle'

export const Header: React.FC = () => {
  return (
    <header className=" p-4 border flex justify-between items-center">
      <div className="text-xl font-bold ">BitBlogs</div>
      <nav className="space-x-4 ">
        <Link to="/home" className="hover:text-gray-400">Home</Link>
        <Link to="/write" className="hover:text-gray-400">Write</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>
      </nav>
      <div className="space-x-4">
        <Link to="/signin">
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </Link>
      </div>
        <ModeToggle />
      
    </header>
  );
};
