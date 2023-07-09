import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './page/home';
import Welcome from './page/welcome';
import Login from './page/login';
import CartPage from './page/cart';
import AccountPage from './page/account';
import InvoicePage from './page/invoicepage';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Welcome />} />
          <Route path='/home' element={ <Home />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/address' element={<AccountPage />} />
          <Route path='/invoices/:id' element={<InvoicePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;