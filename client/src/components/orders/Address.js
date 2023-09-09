import React, { useContext, useState } from 'react';
import { ImArrowLeft2 } from 'react-icons/im';
import { useParams, useNavigate } from 'react-router-dom';
import './css/address.css';

import FormContext from '../context/FormContext';

const Address = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContext);

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);

      setTimeout(() => {
        navigate('checkout');
      }, 500);
    } else {
      setShowErrors(true);
      window.alert('Please fill in all the required fields correctly.');
    }
  };

  const validateForm = () => {
    const { name, email, address, phone, city, state, zip } = formData;
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      address.trim() === '' ||
      !isValidPhoneNumber(phone) ||
      city.trim() === '' ||
      state.trim() === '' ||
      zip.trim() === '' ||
      !isValidZip(zip)
    ) {
      // At least one field is empty or phone number/zip is invalid
      return false;
    }
    return true;
  };

  const isValidPhoneNumber = (phone) => {
    const phonePattern = /^\d{10}$/; // Matches a 10-digit number
    return phonePattern.test(phone);
  };

  const isValidZip = (zip) => {
    const zipPattern = /^\d{5}$/; // Matches a 5-digit number
    return zipPattern.test(zip);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Apply input restrictions for phone number and zip code fields
    if (name === 'phone' || name === 'zip') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      updateFormData(name, numericValue);
    } else {
      updateFormData(name, value);
    }
  };

  const params = useParams();
  console.log('Params: ' + params.id);

  return (
    <div className="address">
      <div className="address-header">
        <div className="arrow" onClick={() => navigate(-1)}>
          <span>
            <ImArrowLeft2 />
          </span>
        </div>
        <div className="add-address">
          <span>Add Address</span>
        </div>
        <div className="page-count">
          <span>2/4</span>
        </div>
      </div>

      <div className="address-contact">
        <h3>Contact</h3>
        <div className="address-contact-form">
          <input
            placeholder="Name*"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            required
            className={showErrors && formData.name.trim() === '' ? 'error' : ''}
          />
          <input
            placeholder="Email*"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            required
            className={showErrors && formData.email.trim() === '' ? 'error' : ''}
          />
        </div>
      </div>

      <div className="address-address">
        <h3>Address</h3>
        <div className="address-input1">
          <input
            placeholder="Address (House No, Building, Street, Area)*"
            name="address"
            onChange={handleInputChange}
            value={formData.address}
            required
            className={showErrors && formData.address.trim() === '' ? 'error' : ''}
          />
          <input
            placeholder="Mobile Number*"
            name="phone"
            onChange={handleInputChange}
            value={formData.phone}
            required
            className={
              showErrors && (formData.phone.trim() === '' || !isValidPhoneNumber(formData.phone))
                ? 'error'
                : ''
            }
          />
          <input
            placeholder="City*"
            name="city"
            onChange={handleInputChange}
            value={formData.city}
            required
            className={showErrors && formData.city.trim() === '' ? 'error' : ''}
          />
        </div>

        <div className="address-input2">
          <input
            placeholder="State*"
            name="state"
            onChange={handleInputChange}
            value={formData.state}
            required
            className={showErrors && formData.state.trim() === '' ? 'error' : ''}
          />
          <input
            placeholder="Pin Code*"
            name="zip"
            onChange={handleInputChange}
            value={formData.zip}
            required
            className={
              showErrors && (formData.zip.trim() === '' || !isValidZip(formData.zip)) ? 'error' : ''
            }
          />
        </div>
      </div>

      <div className="address-note">
        
          <div><center>The billing address will be used same as the <br/> selected address</center></div>
        
      </div>
      {isLoading ? (
        <div className="product-buy-now">
          <img
            className="loader-svg"
            src="https://milaneseleather3d.s3.ap-south-1.amazonaws.com/Logo/Rolling-1.1s-50px+(1).svg"
            alt="img"
          />
        </div>
      ) : (
        <div className="address-add-btn" onClick={handleSubmit}>
          Add
        </div>
      )}
    </div>
  );
};

export default Address;
