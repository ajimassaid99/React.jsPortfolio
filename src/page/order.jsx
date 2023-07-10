import React from 'react';
import Sidebar from '../component/sidebar/sidebar';
import OrderList from '../component/order/orders';


function OrderPage() {

    const token = localStorage.getItem('token');
    if(!token){
      window.location='home';
    }

  return (
    <div className="relative lg:flex lg:flex-row lg:max-h-screen">
      <Sidebar  />
      <div className="flex-grow bg-gray-100 p-8 h-full w-full">
      <OrderList />
      </div>
    </div>
  );
}

export default OrderPage;
