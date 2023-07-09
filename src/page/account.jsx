import React, { useState } from 'react';
import Sidebar from '../component/sidebar/sidebar';
import Profile from '../component/profile/profile';
import OrderList from '../component/order/orders';

function AccountPage() {
  const [activeMenu, setActiveMenu] = useState('profile');

  const renderContent = () => {
    switch (activeMenu) {
      case 'profile':
        return <Profile />;
      case 'orders':
        return <OrderList />;
      default:
        return null;
    }
  };

  return (
    <div className="relative lg:flex lg:flex-row lg:max-h-screen">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-grow bg-gray-100 p-8 h-full w-full">
        {renderContent()}
      </div>
    </div>
  );
}

export default AccountPage;
