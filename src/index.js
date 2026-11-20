import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Blog from './components/blogs/Blog';
import BlogDetail from './components/blogs/BlogDetail';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Account from './components/accounts/Account';
import Myproduct from './components/accounts/MyProduct';
import AddProduct from './components/accounts/AddProduct';
import EditProduct from './components/accounts/EditProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/blog' element={<Blog/>}/>
          <Route path="/blog-detail/:id" element={<BlogDetail/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/account/product' element={<Myproduct/>}/>
          <Route path='/account/add-product' element={<AddProduct/>}/>
          <Route path='/account/edit-product/:id' element={<EditProduct/>}/>
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
