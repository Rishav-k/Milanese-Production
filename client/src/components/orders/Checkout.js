import React, {useContext } from 'react';
import {ImArrowLeft2}from  "react-icons/im";
import axios from 'axios';
import {load} from '@cashfreepayments/cashfree-js';
import FormContext from '../context/FormContext';
import ProductContext from '../context/ProductContext';
import './css/checkout.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const cashfree = await load({
  mode : "sandbox"
}) ;

const Checkout = () => {
  const params = useParams();
  console.log(params.id);
    const navigate = useNavigate();
   const { formData } = useContext(FormContext);
   const { product} = useContext(ProductContext);

    const details = {
  "draft_order": {
    "line_items": [
      {
        "variant_id": 45325892813116,
        "quantity": 1
      }
    ],
    "shipping_address": {
       "first_name":formData.name,
       "last_name": "",
       "address1": formData.address, 
       "city": formData.city, 
       "province": "ON", 
       "country": formData.country, 
       "zip": formData.zip, 
       "phone": formData.phone
       },
    "customer":{"id":7073368015164}
  }
}
 async function handleCashfree(){
   console.log(details);
const header = {
      'Content-Type' : 'application/json'
};
   axios.post('/get_payload_for_paymnetOrder' , details , {header}).then((response)=>{
       
    const payload = response.data;
    const headers = {
      'Content-Type' : 'application/json'
      };
   axios.post('/get_Payment_Order_Session_ID', payload, { headers })
  .then(response => {
    console.log('Response : ', response.data.payment_session_id);
   


 //-------------------------------CashFree Session ID to Payment ---------------------------------//
     let checkoutOptions = {
    paymentSessionId: response.data.payment_session_id,
    returnUrl: "https://www.milaneseleather.com", 
   }
cashfree.checkout(checkoutOptions).then(function(result){
    if(result.error){
        alert(result.error.message)
    }
    if(result.redirect){
      console.log(result);
        console.log("Redirection")
    }
}); 

//----------------------------------------------------------


  })
  .catch(error => {
    console.error('Error:', error);
    console.log("Error in getting session id from cashfree");
  });
 }).catch(err=>{
  console.log("error in Drafting Order");
 })

}

  return (
    <div>
     <div className='checkout-header'>
       <div className = "arrow" onClick={()=>{navigate(-1);console.log("Go Back to Address")}}><span><ImArrowLeft2 /></span></div>
            <div className = "review-order"><span>Review Order</span></div>
            <div className = "page-count"><span>3/4</span></div>
            </div>
       <div className = "checkout">
        <div>
            <div className = "checkout-address">
                <span>Deliver to {formData.name}</span>
                <br/>
                <span>{formData.name} , </span>
                <br/>
                <span>{formData.address} ,</span>
                <br/>
                <span>{formData.city + ", " + formData.country + ", " + formData.zip}</span>
                <br/>
                <span>{formData.phone}</span>
                <br/>
                <button onClick={()=>{navigate(-1);console.log("Go Back to Address")}}>Change Address</button>
            </div>

            <div className ="checkout-Product">
               <h2>Product Details</h2>
              <span>{product.title}</span>
              <br/>
              <span>{product.vendor}</span>
           </div>
           <div className = "checkout-Bill">
              <h2>Bill Details</h2>
              <div className='checkout-billing'>
              <div className ="billing-items"><span>MRP amount</span> <span style={{ color: "black" }}>Rs.{product.price}</span></div>
              <div className ="billing-items"><span>Shipping Charges</span> <span style={{ color: "black" }}> Rs.50.00 </span></div>
              <div className ="billing-items"><span>Sub Total</span> <span style={{ color: "black" }}> Rs. {Number(product.price) + 50}.00</span></div>
              </div>
           </div>
           <div className = "checkout-proceed-to-pay" onClick={handleCashfree}>
             Proceed To Pay
           </div>
           
        </div>
    </div>
    </div>
  )
}

export default Checkout
