import { useState } from 'react';

const useProduct = () => {
  const [product, setProduct] = useState("");

  const updateProduct = (value) => {
    setProduct(value);
  };

  return {
    product,
    updateProduct,
  };
};

export default useProduct;
