import React , {useContext} from 'react'
import {ImArrowLeft2}from  "react-icons/im";
import axios from 'axios';
import { useParams } from "react-router-dom";
import FormContext from '../context/FormContext';
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import './css/address.css';


const Address = (props) => {
  const navigate = useNavigate();
const { updateProduct } = useContext(ProductContext);
const { formData, updateFormData } = useContext(FormContext);

const params = useParams();
  console.log("PArams : " +  params.id);
  

const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

const handleSubmit = async (event) => {
  // console.log(formData);
    event.preventDefault();
//--------------------------Getting Product Details Using ID ----------------------------------------//
    
    const headers = {
      'X-Shopify-Access-Token' : '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'
      };

   const product_details = await axios.get('/get_product_details',{params:{param : params.id}} ,{ headers })
  .then(async response => {
    return response.data;
  }).catch(err=>{
    console.log(err);
  });
  updateProduct(product_details);
  navigate(`checkout`);
//--------------------------Getting Product Details Using ID ---------------------------------------//
};


  return (
    <div className = "address">
         <div className = "address-header">
            <div className = "arrow" onClick={()=>{navigate(-1);console.log("Go Back to customiser")}}><span><ImArrowLeft2 /></span></div>
            <div className = "add-address"><span>Add Address</span></div>
            <div className = "page-count"><span>2/4</span></div>
            
         </div>

    <div className = "address-contact">
      <h3>Contact</h3>
      <div className='address-contact-form'>
        <input placeholder='Name'               name="name"  onChange={handleInputChange} value={formData.name}  required />
        <input placeholder = 'Email'            name="email"  onChange={handleInputChange} value={formData.email} required />
      </div>
    </div>
    
    <div className ="address-address">
       <h3>Address</h3>
       <div className='address-input1'>
       <input placeholder ="Address (House No, Building, Street, Area)" name="address"  onChange={handleInputChange} value={formData.address} required />
       <input placeholder ="Phone no." name="phone" onChange={handleInputChange} value={formData.phone} />
       <input placeholder = "City"                           name="city"  onChange={handleInputChange} value={formData.city}    required/>
       </div>

       <div className = "address-input2">
       <input placeholder="State"                                       name="state"  onChange={handleInputChange} value={formData.state}   required />
       <input placeholder = "Pin Code"                                  name="zip"  onChange={handleInputChange} value={formData.zip}     required />
       </div>

    </div>
      
      <div className = "address-note">
       <center><span>The billing address will be used same as the above address</span></center> 
      </div>

      <div className = "address-add-btn" onClick={handleSubmit}>
         Add
      </div>
    </div>
  )
}

export default Address;
