import React, { useEffect, useState } from 'react';
import Customise from './Customise';
import { useNavigate } from 'react-router-dom';
import { shoes } from './shoes.js';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const params = useParams();

  const [fetchComplete, setFetchComplete] = useState(false);
  const [gotShoe, setGotShoe] = useState(false);
  const [shoe ,setShoe] = useState();
  const navigate = useNavigate();
  const getShoesDetails = async (id) => {
    console.log(id);
    try {
      setShoe(shoes[id]);
      if (shoe) {
        setGotShoe(true);
      }
      // console.log(shoe);
      // console.log(shoe.components[].textures[texture[]].color.code);
    } catch {
      console.log(shoe);
      // alert('Invalid Product ID');
    }
  };

  const callDashboardPage = async () => {
    try {
      const res = await fetch('/authenticate', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log('authentication response:', res);

      if (res.status !== 200) {
        console.log('Status of dashboard:', res.status);
        throw new Error(res.error);
      }

      setFetchComplete(true);
    } catch (error) {
      console.log('Error received:', error);
      navigate('/signin');
    }
  };

  useEffect(() => {
    callDashboardPage();
    getShoesDetails(params.id);
  }); // Include params.id as a dependency to re-fetch shoe details when it changes

  return (
    <div>
      {fetchComplete && gotShoe && <Customise  shoe ={shoe} />}
    </div>
  );
};

export default Dashboard;
