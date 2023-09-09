import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Customiser from './components/customiser/Customise.js'
import SignUp from './components/signin/SignUp.js';
import SignIn from './components/signin/SignIn.js';
import Address from './components/orders/Address.js';
import Checkout from './components/orders/Checkout.js';
import Dashboard from './components/customiser/Dashboard.js';
import Test from './components/orders/Test.js';
import Product from './components/orders/Product.js';

import FormContext from './components/context/FormContext.js';
import useForm from './components/context/useForm.js';

import ProductContext from './components/context/ProductContext.js';
import useProduct from './components/context/useProduct.js';

import CustomerContext from './components/context/CustomerContext.js';
import useCustomer from './components/context/useCustomer.js';

import ImageContext from './components/context/ImageContext.js';
import useImage from './components/context/useImage.js';

import CustomContext from './components/context/CustomContext.js';
import useCustom from './components/context/useCustom.js';

import SoleContext from './components/context/SoleContext.js';
import useSole from './components/context/useSole.js';

function App() {

  const { formData, updateFormData } = useForm();
  const {soleNo , updateSoleNo } = useSole();
  const {
    size,
    product,
    quantity,
    updateSize,
    updateQuantity,
    updateProduct,
  } = useProduct();
  const {customer , updateCustomer} = useCustomer();
  const {imageUrl ,updateImageUrl} = useImage();
  const {customData , updateCustomData} = useCustom();

  return (
    <div className="App">
    <CustomerContext.Provider value = {{customer , updateCustomer}}>
    <FormContext.Provider value={{ formData, updateFormData }}>
    <ProductContext.Provider value={{
    size,
    product,
    quantity,
    updateSize,
    updateQuantity,
    updateProduct,
  }}>
    <CustomContext.Provider value={{customData , updateCustomData}}>
    <ImageContext.Provider value={{imageUrl , updateImageUrl}}>
    <SoleContext.Provider value={{soleNo , updateSoleNo}}>
    <BrowserRouter>
     <Routes>

     <Route path= "test" element={<Test/>} />
     <Route path="signin" element = {<SignIn/>} />
     <Route path = "signup" element ={<SignUp />} />
      <Route path="/products/">
      
           
           <Route path=":id/product/address/checkout" element={<Checkout />} />
           <Route path=":id/product/address" element = {<Address />} />
           <Route path = ":id/product" element ={<Product />} />
           <Route index path=":id" element={<Dashboard />} />
      </Route>
      

     {/* <Route path="/products/:id" element={<Customiser />}></Route> */}
     {/* <Route path="/products/:id/address" element={<Address />}></Route>
     <Route path="/products/:id/checkout" element={<Checkout />}></Route> */}
     </Routes>
     </BrowserRouter>
     </SoleContext.Provider>  
      </ImageContext.Provider>
     </CustomContext.Provider>
     </ProductContext.Provider>
     </FormContext.Provider>
          </CustomerContext.Provider>
    </div>
  );
}

export default App;
