import React, {useState} from 'react'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/home/Dashboard";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import ForgetPassword from './components/auth/ForgetPassword';
import Profile from './components/Account/Profile';
import ResetPassword from './components/auth/ResetPassword';
import EditProfile from './components/Account/EditProfile';
import ChangePassword from './components/Account/ChangePassword';
import Header from './components/common_Components/Header';
import Footer from './components/common_Components/Footer';
import Subscribe from './components/common_Components/Subscribe';
import Address from './components/Account/Address';
import VerifyEmail from './components/auth/VerifyEmail';
import EditAddress from './components/Account/EditAddress';
import AllProducts from './components/Product/AllProducts';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';
import Checkout from './components/Product/Checkout';
import PlaceOrder from './components/Product/PlaceOrder';
import Orders from './components/Product/Orders';
import Search from './components/Product/Search';

function App() {
  const [search,setSearch] = useState('')
  return (
    <>
    <Router>
    <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick
      rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    <Header query={(val)=>setSearch(val)}/>
    <Routes>
      <Route path="/" exact element={<Dashboard search={search}/>}/>
      <Route path="/search" exact element={<Search/>}/>
      <Route path="/subscribe" exact element={<Subscribe/>}/>
      <Route path="/login" exact element ={<Login/>}/>
      <Route path="/register" exact element ={<Register/>}/>
      <Route path="/verify_email" exact element={<VerifyEmail/>}/>
      <Route path="/forgetpassword" exact element={<ForgetPassword/>}/>
      <Route path="/resetpassword" exact element={<ResetPassword/>}/>
      <Route path="/changepassword" exact element={<ChangePassword/>}/>
      <Route path="/profile" exact element={<Profile/>}/>
      <Route path="/edit" exact element={<EditProfile/>}/>
      <Route path="/address" exact element={<Address/>}/>
      <Route path="/editaddress" exact element={<EditAddress/>}/>
      <Route path="/commonproduct" exact element={<AllProducts search={search}/>}/>
      <Route path="/product/:id" exact element={<ProductDetail/>}/>
      <Route path="/cart" exact element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/placeorder" element={<PlaceOrder/>}/>
      <Route path="/order" element={<Orders/>}/>
    </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;







/* import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Dashboard from "./components/home/Dashboard";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import ForgetPassword from './components/auth/ForgetPassword';
import Profile from './components/Account/Profile';
import ResetPassword from './components/auth/ResetPassword';
import EditProfile from './components/Account/EditProfile';
import ChangePassword from './components/Account/ChangePassword';
import Header from './components/common_Components/Header';
import Footer from './components/common_Components/Footer';
import Subscribe from './components/common_Components/Subscribe';
import Address from './components/Account/Address';
import VerifyEmail from './components/auth/VerifyEmail';
import EditAddress from './components/Account/EditAddress';
import AllProducts from './components/Product/AllProducts';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';
import React from 'react';

function App() {
  const [cart,setCart] = React.useState(0)
  return (
    <>
    <Router>
      <Header cart={cart}/>
    <Routes>
      <Route path="/" exact element={<Dashboard setCart={()=>setCart(prev => prev+1)}/>}/>
      <Route path="/subscribe" exact element={<Subscribe/>}/>
      <Route path="/login" exact element ={<Login/>}/>
      <Route path="/register" exact element ={<Register/>}/>
      <Route path="/verify_email" exact element={<VerifyEmail/>}/>
      <Route path="/forgetpassword" exact element={<ForgetPassword/>}/>
      <Route path="/resetpassword" exact element={<ResetPassword/>}/>
      <Route path="/changepassword" exact element={<ChangePassword/>}/>
      <Route path="/profile" exact element={<Profile/>}/>
      <Route path="/edit" exact element={<EditProfile/>}/>
      <Route path="/address" exact element={<Address/>}/>
      <Route path="/editaddress" exact element={<EditAddress/>}/>
      <Route path="/commonproduct" exact element={<AllProducts/>}/>
      <Route path="/product/:id" exact element={<ProductDetail/>}/>
      <Route path="/cart" exact element={<Cart/>}/>
    </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
 */