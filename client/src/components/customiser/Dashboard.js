import React , {useEffect} from 'react';
import Customise from './Customise';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
console.log("hii");

     const navigate = useNavigate();
    const callDashboardPage = async ()=>{
    try{
      const res = await fetch('/authenticate' ,{ 
        method :"GET",
        headers:{
          Accept :"application/json",
          "Content-Type" : "application/json"
        },
        credentials :"include"
      })
      console.log(res.data);
      const data = res.status ;

      if(data!= 200){
        console.log(data + "status of dashboard");
        const err = new Error(res.error);
        throw err;
      }
    }catch(err){
      console.log(err)
       navigate('/signin')
    }
  }

  useEffect(()=>{
    callDashboardPage();});

  return (
    
    <div>
      <Customise />
    </div>
  )
}

export default Dashboard
