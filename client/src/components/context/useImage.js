import { useState } from 'react';

const useImage = () => {
  const [imageUrl, setimageUrl] = useState("");

  const updateImageUrl = (value) => {
    setimageUrl(value);
  };

  return {
    imageUrl,
    updateImageUrl,
  };
};

export default useImage;
