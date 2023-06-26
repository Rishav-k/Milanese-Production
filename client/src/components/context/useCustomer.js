import { useState } from 'react';

const useCustomer = () => {
  const [customer, setCustomer] = useState("");

  const updateCustomer = (value) => {
    console.log(value);
    console.log("customerContext")
    setCustomer(value);
  };

  return {
    customer,
    updateCustomer,
  };
};

export default useCustomer;
