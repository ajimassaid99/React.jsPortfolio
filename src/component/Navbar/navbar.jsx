import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../App/feature/auth/actions';


const Navbar = ({ isLoggedIn, cartItemsCount }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      dispatch(logout());
    }
  };

  return (
    <nav className="bg-gray-900 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="hidden md:block text-white font-bold mr-8">Massaid's Store</div>
          <div className="hidden md:block">
            <button className="text-white bg-gray-700 p-2 rounded-full hover:bg-black">
              <FontAwesomeIcon icon={faFilter} className="text-white mr-2" />
              Filter
            </button>
          </div>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:shadow-outline"
            />
            <button className="absolute top-0 right-0 mt-2 mr-2">
              <FontAwesomeIcon icon={faSearch} className="text-white" />
            </button>
          </div>
          <div className="flex items-center text-white ml-4">
            <a href='cart' className="relative mr-8">
              <FontAwesomeIcon icon={faShoppingCart} className="text-white text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-1 text-xs">
                  {cartItemsCount}
                </span>
              )}
            </a>
            {isLoggedIn ? (
              <div className="relative">
                <button className="ml-2" onClick={handleToggleDropdown}>
                  <FontAwesomeIcon icon={faUser} className="text-white w-4 h-4 rounded-full border p-2" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-gray-500 rounded shadow-md">
                    <ul className="py-2">
                      <a href='address'><li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li></a>
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                        Logout
                      </li>
                      {/* Tambahkan opsi dropdown profile lainnya di sini */}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="login" className="ml-2">
                  Login
                </a>
              </>
            )}
          </div>
          <div className="block md:hidden">
            <button className="text-white mr-2">
              <FontAwesomeIcon icon={faFilter} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
