import { useState } from 'react';

const useProduct = () => {
  const [product, setProduct] = useState("");
  const [size , setSize] = useState();
  const [quantity , setQuantity] = useState(1);

  const updateQuantity = (value)=>{
    setQuantity(value);
  }
  const updateSize = (value) => {
    setSize(value);
  }
  const updateProduct = (value) => {
    setProduct(value);
  };

  return {
    size,
    product,
    quantity,
    updateSize,
    updateQuantity,
    updateProduct,
  };
};

export default useProduct;
