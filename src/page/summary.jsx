import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import Navbar from '../component/Navbar/navbar';
import { getCart } from '../App/feature/cart/actions';
import { getAddress } from '../App/feature/addresses/actions';
import { useEffect, useState } from 'react';
import AddressOption from '../component/address/addressOption';
import axios from 'axios';


function SummaryPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { addresses } = useSelector((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getAddress());
  }, [dispatch]);

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.qty;
    });
    return totalPrice;
  };

  const deliveryFee = 20000; // Example delivery fee

  const handleOrder = async () => {
    const order = {
        "delivery_fee":deliveryFee,
        "delivery_address":selectedAddress
    };

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post('http://localhost:3002/api/orders', order, config);
      const id = response.data._id; 
      window.location=`order-succesed/${id}`
    } catch (error) {
      console.error(error); // Handle error response
    }
  };
  return (
    <>
      <Navbar isLoggedIn={true} cartItemsCount={cartItems.length} />
      <div className="container mx-auto px-12 py-10 bg-white">
        <h1 className="text-3xl font-bold mb-6">Summary</h1>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Delivery Address</h2>
          {addresses.map((address) => (
            <div key={address._id} className="mb-4">
              <AddressOption
                address={address}
                selected={selectedAddress === address._id}
                onSelect={handleAddressSelect}
              />
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Cart Items</h2>
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center border-b py-4">
              <img
                src={item.product.image_url ? item.product.image_url : "https://iber.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png"}
                className="w-24 h-24 object-cover mr-4"
                alt=""
              />
              <div>
                <p className="text-lg font-bold">{item.product.name}</p>
                <p className="text-gray-500">Price: {item.product.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                <p className="text-gray-500">Quantity: {item.qty}</p>
              </div>
              <div className="ml-auto">
                <p className="text-lg font-semibold">{(item.product.price * item.qty).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Delivery Fee</h2>
          <p>{deliveryFee.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Total Price</h2>
          <p>{(calculateTotalPrice() + deliveryFee).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
        </div>
        <Button
          ripple={false}
          className="bg-gray-500 hover:bg-gray-600 text-white my-6"
          disabled={!selectedAddress}
          onClick={handleOrder}
        >
            Order
        </Button>
      </div>
    </>
  );
}

export default SummaryPage;