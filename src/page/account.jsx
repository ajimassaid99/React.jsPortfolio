import React from 'react';
import Sidebar from '../component/sidebar/sidebar';
import Profile from '../component/profile/profile';


function AccountPage() {

  const token = localStorage.getItem('token');
  if(!token){
    window.location='home';
  }
  
  return (
    <div className="relative lg:flex lg:flex-row lg:max-h-screen">
      <Sidebar  />
      <div className="flex-grow bg-gray-100 p-8 h-full w-full">
      <Profile />
      </div>
    </div>
  );
}

export default AccountPage;
