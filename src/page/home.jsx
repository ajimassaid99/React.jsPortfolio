import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../App/feature/products/actions';
import { getuser } from '../App/feature/auth/actions';
import { getCart } from '../App/feature/cart/actions';
import Product from '../component/product/product';
import Navbar from '../component/Navbar/navbar';
import Loading from '../component/loading/loading';
import EmptyProduct from '../component/product/productEmpty';
import Pagination from '../component/pagination/pagination';

function Home() {
  const dispatch = useDispatch();
  const { products, auth, cart } = useSelector((state) => state);
  const { error, loading } = products;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const limit = 8;
  const [skip,setSkip] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts(search, category, tags,skip,limit));
    dispatch(getuser());
    dispatch(getCart());
  }, [dispatch, search, category, tags,skip,limit]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleFilter = (value) => {
    setCategory(value.category);
    setTags(value.tags);
    setSkip(0);
    setCurrentPage(1);
  };
 
  const handlePageChange = (event) => {
    console.log(event)
    const aktivSkip = (parseInt(event) - 1) * limit;
      setCurrentPage(event);
      setSkip(aktivSkip);
  };

  return (
    <div className='bg-gray-50 min-h-screen pt-24'>
      {!auth.token && <Navbar onSearch={handleSearch} onFilterActive={handleFilter} />}
      {auth.token && (
        <Navbar isLoggedIn={true} cartItemsCount={cart.cartItems.length} onSearch={handleSearch} onFilterActive={handleFilter} />
      )}
      {loading && (
        <div className="my-24">
          <Loading color={'gray'} message={'Loading'} />
        </div>
      )}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (!products.productItems || !products.productItems.data || products.productItems.data.length === 0) && (
        <EmptyProduct />
      )}
      {!loading && !error && products.productItems && products.productItems.data && products.productItems.data.length > 0 && (
        <div className="container mx-auto my-4 bg-grey-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.productItems.data.map((product) => {
              if (cart.cartItems && cart.cartItems.some((item) => item.product._id === product._id)) {
                return <Product key={product._id} product={product} status={true} isLoggedIn={!!auth.token} />;
              }
              return <Product key={product._id} product={product} status={false} isLoggedIn={!!auth.token} />;
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            totalProducts={products.productItems.count}
            productsPerPage={limit}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Home;