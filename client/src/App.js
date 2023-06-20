import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Customiser from './components/customiser/Customise.js'
import SignIn from './components/signin/SignIn.js';
import Address from './components/orders/Address.js';
import Checkout from './components/orders/Checkout.js';
import FormContext from './components/context/FormContext.js';
import useForm from './components/context/useForm.js';
import Test from './components/orders/Test.js';
import ProductContext from './components/context/ProductContext.js';
import useProduct from './components/context/useProduct.js';
import Dashboard from './components/customiser/Dashboard.js';

function App() {

  const { formData, updateFormData } = useForm();
  const { product, updateProduct } = useProduct();

  return (
    <div className="App">
    <FormContext.Provider value={{ formData, updateFormData }}>
    <ProductContext.Provider value={{ product, updateProduct }}>
    <BrowserRouter>
     <Routes>
     <Route path= "test" element={<Test/>} />
     <Route path="signin" element = {<SignIn/>} />
      
      <Route path="/products/">
           <Route index path=":id" element={<Dashboard />} />
           <Route path=":id/address" element = {<Address />} />
           <Route path=":id/address/checkout" element={<Checkout />} />
      </Route>
      

     {/* <Route path="/products/:id" element={<Customiser />}></Route> */}
     {/* <Route path="/products/:id/address" element={<Address />}></Route>
     <Route path="/products/:id/checkout" element={<Checkout />}></Route> */}
     </Routes>
     </BrowserRouter>
     </ProductContext.Provider>
     </FormContext.Provider>
    </div>
  );
}

export default App;
