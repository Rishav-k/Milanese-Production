import React , {useContext} from 'react'
import FormContext from '../context/FormContext';
import { NavLink } from 'react-router-dom';

const Test = () => {
  const { formData, updateFormData } = useContext(FormContext);

 const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };
  return (
    <div>
      <div className = "address-contact">
      <h3>Contact</h3>
      <form>
        <input placeholder='name'               name="name"  onChange={handleInputChange} value={formData.name}  required />
        <input placeholder = 'email'            name="email"  onChange={handleInputChange} value={formData.email} required />
      </form>
    </div>
    
    <div className ="address-address">
       <h3>Address</h3>
       <input placeholder ="Address (House No, Building, Street, Area)" name="address"  onChange={handleInputChange} value={formData.address} required />
       <input placeholder ="Phone no." name="phone" onChange={handleInputChange} value={formData.phone} />
       <input placeholder = "Locality / Town"                           name="city"  onChange={handleInputChange} value={formData.city}    required/>
       <input placeholder="State"                                       name="state"  onChange={handleInputChange} value={formData.state}   required />
       <input placeholder ="Country"                                    name="country"  onChange={handleInputChange} value={formData.country} required/>
       <input placeholder = "Pin Code"                                  name="zip"  onChange={handleInputChange} value={formData.zip}     required />
    </div>
      
      <div className = "address-note">
        <span>The billing address will be used same as the above address</span>
      </div>

      <div className = "address-add-btn">
          <NavLink to="/checkout">
        <button>Add</button>
      </NavLink>
      </div>
    </div>
  )
}

export default Test
