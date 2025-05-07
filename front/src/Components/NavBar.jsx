import React, { useState } from 'react';
import { useUser } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import { Menu, X } from 'react-feather';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useUser();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={user?.role === 'admin' ? "/admin" : "/"} className="text-2xl font-bold text-yellow-600">
          EventBook {user?.role === 'admin' && 'DashBoard'}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {user?.role !== 'admin' && (
            <>
              <Link to="/" className="hover:text-yellow-600">Home</Link>
              <Link to="/events" className="hover:text-yellow-600">Events</Link>
              <Link to="/contact" className="hover:text-yellow-600">Contact</Link>
            </>
          )}
          {!isAuthenticated ? (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
          ) : (
            <Link to="/profile" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {user?.name || 'Profile'}
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-6">
          {user?.role !== 'admin' && (
            <>
              <Link to="/" className="block hover:text-yellow-600" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/events" className="block hover:text-yellow-600" onClick={() => setIsOpen(false)}>Events</Link>
              <Link to="/contact" className="block hover:text-yellow-600" onClick={() => setIsOpen(false)}>Contact</Link>
            </>)}
          {!isAuthenticated ? (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          ) : (
            <Link to="/profile" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setIsOpen(false)}>
              {user?.name || 'Profile'}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;