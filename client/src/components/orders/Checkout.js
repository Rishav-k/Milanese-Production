import React, {useContext , useState} from 'react';
import {ImArrowLeft2}from  "react-icons/im";
import axios from 'axios';
import {load} from '@cashfreepayments/cashfree-js';
import FormContext from '../context/FormContext';
import ProductContext from '../context/ProductContext';
import CustomerContext from '../context/CustomerContext';
import CustomContext from '../context/CustomContext';
import './css/checkout.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


// import {AiOutlineEyeInvisible} from "react-icons/ai";
// import {AiOutlineEye} from "react-icons/ai";


const cashfree = await load({
  mode : "sandbox"
}) ;

const Checkout = () => {
  const params = useParams();
  console.log(params.id);
   const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();
   const { formData } = useContext(FormContext);
   const { product ,size , quantity} = useContext(ProductContext);
   const {customer} = useContext(CustomerContext);
   const {customData} = useContext(CustomContext);
 console.log(product);
 
    const details = {
  "draft_order": {
    "note" : JSON.stringify(customData),
    "line_items": [
      {
        "variant_id": String(size),
        "quantity": quantity
      }
    ],
    "shipping_address": {
       "first_name":String(formData.name),
       "last_name": "",
       "address1": String(formData.address), 
       "city": String(formData.city), 
       "province": "ON", 
       "country": String(formData.country), 
       "zip": String(formData.zip), 
       "phone": String(formData.phone)
       },
    "customer":{"id":String(customer.id)}
  }
}
 async function handleCashfree(){
  setIsLoading(true);

  //  console.log(details);
const header = {
      'Content-Type' : 'application/json'
};
   axios.post('/api/get_payload_for_paymnetOrder' , details , {header}).then((response)=>{
       
    const payload = response.data;
    console.log(payload);
    const headers = {
      'Content-Type' : 'application/json'
      };
      console.log(payload);
   axios.post('/api/get_Payment_Order_Session_ID', payload, { headers })
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
              <br/>
              <span>Quantity : {quantity}</span>
           </div>
           <div className = "checkout-Bill">
              <h2>Bill Details</h2>
              <div className='checkout-billing'>
              <div className ="billing-items"><span>MRP amount</span> <span style={{ color: "black" }}>Rs.{product.price*quantity}</span></div>
              <div className ="billing-items"><span>Shipping Charges</span> <span style={{ color: "green" }}> FREE </span></div>
              <div className ="billing-items"><span>Sub Total</span> <span style={{ color: "black" }}> Rs. {Number(product.price*quantity)}.00</span></div>
              </div>
           </div>
           {isLoading?(<div className='checkout-proceed-to-pay'>
            <img className='loader-svg' src="https://milaneseleather3d.s3.ap-south-1.amazonaws.com/Logo/Rolling-1.1s-50px+(1).svg" alt="img"/></div>):( <div className = "checkout-proceed-to-pay" onClick={handleCashfree}>
             Proceed To Pay
           </div>)}
          
           
        </div>
    </div>
    </div>
  )
}

export default Checkout;
