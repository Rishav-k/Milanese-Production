import { useState } from 'react';

const useCustom = () => {
  const [customData , setCustomData] = useState("");
  const updateCustomData = (value) => {
    console.log(value);
    // console.log("customerContext")
    setCustomData(value);
  };

  return {
    customData,
    updateCustomData,
  };
};

export default useCustom;
