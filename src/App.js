import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/home';
import Welcome from './page/welcome';
import Login from './page/login';
import CartPage from './page/cart';
import AccountPage from './page/account';
import InvoicePage from './page/invoicepage';
import SummaryPage from './page/summary';
import OrderSuccessPage from './page/orderSuccesed';
import OrderPage from './page/order';
import Register from './page/register';


function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Welcome />} />
          <Route path='/home' element={ <Home />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/register' element={ <Register />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/orders' element={<OrderPage />} />
          <Route path='/summary' element={<SummaryPage />} />
          <Route path='/invoices/:id' element={<InvoicePage />} />
          <Route path='/order-succesed/:id' element={<OrderSuccessPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;