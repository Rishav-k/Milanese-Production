import React, { useEffect, useState, useContext } from 'react';
import Customise from './Customise';
import { useNavigate } from 'react-router-dom';
import { shoes } from './shoes.js';
import { useParams } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import CustomerContext from '../context/CustomerContext';

var callProduct = true;

const Dashboard = () => {
  const params = useParams();
  const {  updateProduct } = useContext(ProductContext);
  const {   updateCustomer } = useContext(CustomerContext);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [gotShoe, setGotShoe] = useState(false);
  // const [gotProduct, setGotProduct] = useState(false);
  const [shoe, setShoe] = useState();
  const navigate = useNavigate();

  const getProductDetails = async (id) => {
    callProduct = false;
    console.log(id);
    // setGotProduct(true);
   fetch(`/api/get_product_details?params=${id}`)
  .then(response => {
     if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    return response.json();
  })
  .then(product_details => {
    updateProduct(product_details);
    // console.log(product);    
  })
  .catch(error => {
    console.log(error);
  })
  };

  const getShoesDetails = async (id) => {
    console.log(id);
    try {
      setShoe(shoes[id]);
      if (shoe) {
        setGotShoe(true);
      }
    } catch (error) {
      console.log(shoe);
      // alert('Invalid Product ID');
    }
  };

  const callDashboardPage = async () => {
  try {
    const response = await fetch('/api/authenticate', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    const data = await response.json();
    console.log(data);
    updateCustomer(data);
    // Update the necessary state or perform any other actions with the data
    setFetchComplete(true);
  } catch (error) {
    console.log('Error received:', error);
    navigate('/signin');
  }
};
if(callProduct){
   getProductDetails(params.id);
}

  useEffect(() => {
    callDashboardPage();
    getShoesDetails(params.id);
});

  return (
    <div>
      {!fetchComplete || !gotShoe ? (
        <div className="loader-container">
          <div>
            <img className="loader-image" src="https://milaneseleather3d.s3.ap-south-1.amazonaws.com/Spin-1.2s-62px.svg" alt="Loading..." />
          </div>
        </div>
      ) : (
        <Customise shoe={shoe} />
      )}
    </div>
  );
};

export default Dashboard;
