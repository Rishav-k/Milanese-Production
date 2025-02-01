import React, { useState, useContext, useEffect } from 'react';
import Customise from './Customise';
// import { useNavigate } from 'react-router-dom';
import { shoes } from './shoes.js';
import { useParams } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
// import CustomerContext from '../context/CustomerContext';

const Dashboard = () => {
  const params = useParams();
  const { updateProduct } = useContext(ProductContext);
  // const { updateCustomer } = useContext(CustomerContext);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [shoe, setShoe] = useState();
  // const navigate = useNavigate();

  const getProductDetails = (id) => {
    fetch(`/api/get_product_details?params=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        return response.json();
      })
      .then((product_details) => {
        console.log(product_details);
        updateProduct(product_details);
         // Move the fetch completion flag here
      })
      .catch((error) => {
        console.log(error);
      });
      setFetchComplete(true);
  };

  const getShoesDetails = (id) => {
    try {
      const selectedShoe = shoes[id];
      if (selectedShoe) {
        setShoe(selectedShoe);
      } else {
        throw new Error('Invalid Product ID');
      }
    } catch (error) {
      console.log(error);
      // Handle the error accordingly, e.g., show an error message
    }
  };

  // const callDashboardPage = async () => {
  //   try {
  //     const response = await fetch('/api/authenticate', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to authenticate');
  //     }

  //     const data = await response.json();
  //     updateCustomer(data);
  //   } catch (error) {
  //     console.log('Error received:', error);
      // navigate('/signin');
  //   }
  // };

  useEffect(() => {
    getProductDetails(params.id);
    getShoesDetails(params.id);
    // callDashboardPage();
     // eslint-disable-next-line
  }, [params.id] );

  if (!fetchComplete || !shoe) {
    return (
      <div className="loader-container">
        <div>
          <img
            className="loader-image"
            src="https://milaneseleather3d.s3.ap-south-1.amazonaws.com/Spin-1.2s-62px.svg"
            alt="Loading..."
          />
        </div>
      </div>
    );
  }

  return <Customise shoe={shoe} />;
};
export default Dashboard;