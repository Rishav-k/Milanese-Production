import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Customiser from './components/customiser/Customise.js'
import SignUp from './components/signin/SignUp.js';
import SignIn from './components/signin/SignIn.js';
import Address from './components/orders/Address.js';
import Checkout from './components/orders/Checkout.js';
import Dashboard from './components/customiser/Dashboard.js';
import Test from './components/orders/Test.js';

import FormContext from './components/context/FormContext.js';
import useForm from './components/context/useForm.js';

import ProductContext from './components/context/ProductContext.js';
import useProduct from './components/context/useProduct.js';

import CustomerContext from './components/context/CustomerContext.js';
import useCustomer from './components/context/useCustomer.js';


function App() {

  const { formData, updateFormData } = useForm();
  const { product, updateProduct } = useProduct();
  const {customer , updateCustomer} = useCustomer();

  return (
    <div className="App">
    <CustomerContext.Provider value = {{customer , updateCustomer}}>
    <FormContext.Provider value={{ formData, updateFormData }}>
    <ProductContext.Provider value={{ product, updateProduct }}>
    
    <BrowserRouter>
     <Routes>

     <Route path= "test" element={<Test/>} />
     <Route path="signin" element = {<SignIn/>} />
     <Route path = "signup" element ={<SignUp />} />
      <Route path="/products/">
           <Route path=":id/address/checkout" element={<Checkout />} />
           <Route path=":id/address" element = {<Address />} />
           <Route index path=":id" element={<Dashboard />} />
      </Route>
      

     {/* <Route path="/products/:id" element={<Customiser />}></Route> */}
     {/* <Route path="/products/:id/address" element={<Address />}></Route>
     <Route path="/products/:id/checkout" element={<Checkout />}></Route> */}
     </Routes>
     </BrowserRouter>

     </ProductContext.Provider>
     </FormContext.Provider>
          </CustomerContext.Provider>
    </div>
  );
}

export default App;
