 import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../App/feature/cart/actions';
import { getCart } from '../../App/feature/cart/actions';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter
} from "@material-tailwind/react";
import starImage from "../../assets/images/star.png";
import Popup from '../PopUp/popUp';
import Loading from '../loading/loading';

export default function Product(props) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const cartItems = cart.cartItems;
  const ratingStars = [];
  for (let i = 1; i <= props.product.rating; i++) {
    ratingStars.push(<img key={i} src={starImage} alt="" className="w-4 h-4" />);
  }
  const price = props.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

  const [showMustLogin, setShowMustLogin] = useState(false);
  const [status, setStatus] = useState(props.status);


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  

  const handleAddToCart = () => {
    if (props.isLoggedIn) {
      const updatedItems = [
        ...cartItems.map((item) => ({ product: {_id:item.product._id}, qty: item.qty })),
        {
          product: {
            _id: props.product._id
          },
          qty: 1
        }
      ];

      const cartData = {
        items: updatedItems
      };
      console.log(cartData);
      dispatch(updateCart(cartData));
      setStatus(true);
    } else {
      setShowMustLogin(true);
    }
  };

  const handleMustLogin = () => {
    setShowMustLogin(true);

    setTimeout(() => {
      setShowMustLogin(false);
    }, 2000);
  };


  return (
    <Card shadow={true} className='my-4'>
      <CardHeader shadow={false} floated={false} className="">
        <img
          src={props.product.image_url ? props.product.image_url : "https://iber.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png"}
          className="w-200 h-200 object-cover"
          alt=''
        />
      </CardHeader>
      <CardBody>
        <div className="flex flex-col justify-between mb-2">
          <div className="flex items-center" style={{ alignItems: 'flex-start' }}>
            <Typography color="blue-gray" className="font-medium">
              {props.product.name}
            </Typography>
            <div className="ml-auto" style={{ whiteSpace: 'nowrap' }}>
              <Typography color="gray" variant="caption">
                {props.product.sold ? props.product.sold : 0} sold
              </Typography>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              {ratingStars}
            </div>
            <Typography color="blue-gray" className="font-medium">
              {price}
            </Typography>
          </div>
        </div>
        <Typography variant="small" color="gray" className="font-normal opacity-75">
          {props.product.category.name}
        </Typography>
      </CardBody>
      <CardFooter className="mt-auto">
        {props.isLoggedIn ? (
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 hover:bg-blue-gray-300 focus:shadow-none focus:scale-105 active:scale-100"
            disabled={status}
            onClick={handleAddToCart}
          >
            { cart.isLoading ? <Loading /> : status?'Added In Cart' : 'Add to Cart'}
          </Button>
        ) : (
          <>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 hover:bg-blue-gray-300 focus:shadow-none focus:scale-105 active:scale-100"
              onClick={handleMustLogin}
            >
              Add to Cart
            </Button>
            {showMustLogin && (
              <Popup message="You must login to add to cart" bgcolor="gray-900" />
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
