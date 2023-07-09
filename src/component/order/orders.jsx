import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../App/feature/orders/actions';
import Loading from '../loading/loading';
function OrderList() {
  const dispatch = useDispatch();
  const {  orders } = useSelector((state) => state);
  const handlePayment = (redirectUrl) => {
    window.location.href = redirectUrl;
  };

  useEffect(() => {
    dispatch(getOrders());    
  }, [dispatch]);

  console.log(orders.ordersList.length);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order List</h1>
      {orders.Loading && <Loading color={'black'}/>}
      {orders.ordersList && orders.ordersList.length === 0 && <div>Data Kosong</div>}
      {orders.ordersList &&orders.ordersList.length > 0 && orders.ordersList.map((order) => (
        <div key={order._id} className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Order Items</h2>
            {order.order_items.map((item) => (
              <div key={item._id} className="flex items-center justify-between mb-2">
                <div><p className="text-gray-600">
                  {item.name} ok
                </p>
                <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}</p>
                </div>
                <div>
                <p className={'text-gray-600'}>Qty: {item.qty}</p>
                </div>
              </div>
            ))}
            
          </div>
          <div className="flex items-center justify-between mb-2">
                <p className={`${order.status === 'delivery' ? 'bg-green-300' : 'bg-gray-300'} px-4 p-1 rounded-full text-center`}>{order.status}</p>
                <a href={`/invoices/${order._id}`}><p className='bg-gray-500 text-white hover:bg-gray-700 p-1 px-4 rounded-full'>Invoice</p></a>
        </div>
        <div className='flex'>
        {order.status === 'waiting_payment' && <button
            className="bg-gray-600 hover:bg-gray-800 text-white py-1 px-4 rounded-full"
            onClick={() => handlePayment(order.redirect_url)}
          >
            Pay
          </button>
}
            </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
