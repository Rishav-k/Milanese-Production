import { useState } from 'react';

const useSole = () => {
  const [soleNo , setSoleNo] = useState(0);
  const updateSoleNo = (value) => {
    console.log(value);
    setSoleNo(value);
  };

  return {
    soleNo,
    updateSoleNo,
  };
};

export default useSole;
