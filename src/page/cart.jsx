import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@material-tailwind/react";
import { getCart } from '../App/feature/cart/actions';
import { updateCart } from '../App/feature/cart/actions';
import { getProducts } from '../App/feature/products/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const [reget, setReget] = useState(false);
  
    useEffect(() => {
      dispatch(getCart());
      dispatch(getProducts());
      setReget(false);
    }, [dispatch, reget]);
  
    const [cartItemsQty, setCartItemsQty] = useState({});
  
    useEffect(() => {
      // Inisialisasi jumlah produk di keranjang
      const initialCartItemsQty = cartItems.reduce((qty, item) => {
        qty[item.product._id] = item.qty;
        return qty;
      }, {});
      setCartItemsQty(initialCartItemsQty);
    }, [cartItems]);
  
    const handleQtyChange = (productId, newQty) => {
        if (newQty === 0) {
          const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
          if (confirmDelete) {
            const updatedItems = cartItems.filter((item) => item.product._id !== productId);
      
            const cartData = {
              items: updatedItems,
            };
      
            dispatch(updateCart(cartData));
            setReget(true);
            return;
          }
        }
      
        setCartItemsQty((prevQty) => ({
          ...prevQty,
          [productId]: newQty,
        }));
        const updatedItems = cartItems.map((item) => {
          if (item.product._id === productId) {
            return {
              ...item,
              qty: newQty,
            };
          }
          return item;
        });
      
        const cartData = {
          items: updatedItems,
        };
      
        dispatch(updateCart(cartData));
        setReget(true);
      };
      
  
    const getProductPrice = (productId) => {
      const item = cartItems.find((item) => item.product._id === productId);
      if (item) {
        const price = item.product.price * cartItemsQty[item.product._id];
        return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
      }
      return 0;
    };
    const getperProductPrice = (productId) => {
        const item = cartItems.find((item) => item.product._id === productId);
        if (item && item.product.price) {
          const price = item.product.price ;
          return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        }
        return 0;
      };
  
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.product.price * cartItemsQty[item.product._id];
      });
      return total.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    };
  
    return (
      <div className="container mx-auto px-12 py-10 bg-white">
        <h1 className="text-3xl font-bold mb-6">Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col">
            {cartItems.map((item) => (
              <div key={item.product._id} className="flex items-center border-b py-4">
                <img
                  src={item.product.image_url ? item.product.image_url : "https://iber.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png"}
                  className="w-24 h-24 object-cover mr-4"
                  alt=""
                />
                <div>
                  <p className="text-lg font-bold">{item.product.name}</p>
                  <p className="text-gray-500">Price: {getperProductPrice(item.product._id)}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQtyChange(item.product._id, cartItemsQty[item.product._id] - 1)}
                      className="px-2 py-1 rounded bg-gray-500 text-white"
                    >
                      -
                    </button>
                    <p className="text-gray-500 mx-2">{cartItemsQty[item.product._id]}</p>
                    <button
                      onClick={() => handleQtyChange(item.product._id, cartItemsQty[item.product._id] + 1)}
                      className="px-2 py-1 rounded bg-gray-500 text-white"
                    >
                      +
                    </button>
                    <button
              onClick={() => handleQtyChange(item.product._id, 0)} // Call handleQtyChange with 0 to remove the item
              className="px-2 py-1 rounded bg-red-500 text-white ml-12"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-lg font-semibold">{getProductPrice(item.product._id)}</p>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold mt-4">Total Price:</p>
                <p className="text-lg font-bold">{calculateTotalPrice()}</p>
              </div>
              <Button
                ripple={false}
                className="bg-gray-500 hover:bg-gray-600 text-white my-12"
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
  