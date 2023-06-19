import { useState } from 'react';

const useForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    zip: '',
  });

  const updateFormData = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return {
    formData,
    updateFormData,
  };
};

export default useForm;
