import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOrders } from '../App/feature/orders/actions';
import Loading from '../component/loading/loading';

function OrderSuccessPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ordersList, loading } = useSelector((state) => state.orders);
  const [url, setUrl] = useState('');

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    const order = ordersList.find((order) => order._id === id);
    if (order) {
      setUrl(order.redirect_url);
    }
  }, [id, ordersList]);

  if (loading) {
    // Render loading state
    return <Loading />;
  }
  console.log(ordersList, url)

  function handlePayNowClick() {
    const win = window.open(url, '_blank');
    win.focus();
  }
  if (!url) {
    // Render pesan "Order not found"
    return (
      <div className="bg-white py-16 px-8 sm:px-16">
        <div className="max-w-md mx-auto">
          <p className="mt-4 text-center text-gray-500">Order not found.</p>
          <div className="mt-8 flex justify-center">
            <Link to="/" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-8 sm:px-16 flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl" />
        </div>
        <h2 className="mt-8 text-center text-2xl font-bold text-gray-800">Your order has been placed!</h2>
        <p className="mt-4 text-center text-gray-500">Thank you for shopping with us.</p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="../../home" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">
            Back to Home
          </Link>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg" onClick={handlePayNowClick}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;