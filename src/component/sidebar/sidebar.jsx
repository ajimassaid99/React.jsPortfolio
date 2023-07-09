import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faListAlt, faBars, faHome } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ activeMenu, setActiveMenu }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div >
     <div className={`bg-gray-800 text-white w-64   ${isExpanded ? 'absolute top-0 left-0 z-10' : 'hidden'} lg:block lg:fixed lg:h-screen h-full overflow-y-auto`}>
        <h2 className="text-2xl font-bold p-4">Massaid's Store</h2>
        <ul className="p-4">
          <li className="mb-2">
            <NavLink
              className={`flex items-center text-gray-300 hover:text-white ${
                activeMenu === 'profile' && 'text-white'
              }`}
              onClick={() => {setActiveMenu('profile'); toggleSidebar()}}
              activeclassname="text-white"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              className={`flex items-center text-gray-300 hover:text-white ${
                activeMenu === 'orders' && 'text-white'
              }`}
              onClick={() => {setActiveMenu('orders'); toggleSidebar()}}
              activeclassname="text-white"
            >
              <FontAwesomeIcon icon={faListAlt} className="mr-2" />
              Orders
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              className={`flex items-center text-gray-300 hover:text-white}`}
              activeclassname="text-white"
              to="../home"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="lg:hidden flex justify-end w-full">
        <button
          onClick={toggleSidebar}
          className="block p-2 text-gray-500 hover:text-white focus:text-white focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;