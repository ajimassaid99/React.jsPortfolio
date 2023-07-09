import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../App/feature/products/actions';
import { getuser } from '../App/feature/auth/actions';
import { getCart } from '../App/feature/cart/actions';
import Product from '../component/product/product';
import Navbar from '../component/Navbar/navbar';
import Loading from '../component/loading/loading';

function Home() {
  const dispatch = useDispatch();
  const { products,auth,cart } = useSelector((state) => state);
  const { error, loading } = products;
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getuser());
    dispatch(getCart());
  }, [dispatch]);
  return (
    <>
      {!auth.token &&<Navbar />}
      {auth.token &&<Navbar isLoggedIn={true} cartItemsCount={cart.cartItems.length}/>}
      {loading && <div className='my-24'><Loading  color={'gray'} message={'Loading'}/></div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (!products.productItems || !products.productItems.data || products.productItems.data.length === 0) && (
        <div>Tidak ada produk yang ditemukan</div>
      )}
      {!loading && !error && products.productItems && products.productItems.data && products.productItems.data.length > 0 && (
        <div className="container mx-auto my-4 bg-grey-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.productItems.data.map((product) => {
              if (cart.cartItems.some((item) => item.product._id === product._id)) {
                return <Product key={product._id} product={product} status={true} isLoggedIn={!!auth.token} />;
              }
              return  <Product key={product._id} product={product} status={false} isLoggedIn={!!auth.token} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
