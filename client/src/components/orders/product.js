import React, { useContext ,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {ImArrowLeft2}from  "react-icons/im";
import {BsCurrencyRupee}from  "react-icons/bs";
import {AiOutlineRight}from  "react-icons/ai";
import {BiMinus}from  "react-icons/bi";
import {PiPlusBold}from  "react-icons/pi";


import './css/product.css';

import ImageContext from '../context/ImageContext';
import ProductContext from '../context/ProductContext';

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);  

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  // }, []);
const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      navigate('address'); // Assuming you have a navigate function to navigate to the 'address' page
    }, 500);
  };
    const navigate = useNavigate();
    const {
        size,
    product,
    quantity,
    updateSize,
    updateQuantity,
    } = useContext(ProductContext);
    const {imageUrl} = useContext(ImageContext)
  const [isChartVisible , setIsChartVisible] = useState(false);
    const variants = [];
    product.variants.forEach((item, index)=>{
        variants.push(<div  key = {index} onClick={()=>{updateSize(item.id);console.log(size)}} className= {`product-variants ${item.id === size ? 'product-variants-active' : ''}`} ><div>{item.title}</div></div>)
    })

    function handleSizeChart(){
        setIsChartVisible(!isChartVisible);
    }


    // console.log(variants);
    return (
    <div className='product'>
       <div className='product-header'>
             <div className='arrow' onClick={()=>{navigate(-1);console.log("-1")}}><ImArrowLeft2/></div>
             <div className='select-product-title'> Select Product</div>
             <div className='page-count'>1/4</div>
       </div>
       <div className='custom-product-image'>
         <img src = {imageUrl} alt = "img-Source-Canvas" />
       </div>
       <div className='product-details'>
       <div className='product-small-details'>
           <div className='product-title'>
            {product.title}
           </div>
           <div className='product-price'>
            <BsCurrencyRupee/>{product.price}
           </div>
           
           <div className='product-size-choose'>
           <div className='size-guide'><span>Select Size (UK Size)</span> <span onClick={()=>{handleSizeChart();console.log("view-chart")}}>Size Guide <AiOutlineRight/></span></div>
            <div className='product-size'>{variants}</div>
           </div>

           <div className = "product-quantity">
              <div>Quantity</div>
              <div className = "quantity-buttons"><span onClick={()=>{if(quantity>1){updateQuantity(quantity-1)}}}><BiMinus /></span><span>{quantity}</span> <span onClick={()=>{updateQuantity(quantity+1)}}><PiPlusBold/></span></div>
           </div>
        </div>
       </div>
        {isLoading ? (
          
       <div className='product-buy-now'><img className='loader-svg' src="https://milaneseleather3d.s3.ap-south-1.amazonaws.com/Logo/Rolling-1.1s-50px+(1).svg" alt="img"/></div>
      ) : (
        <div className="product-buy-now" onClick={handleClick}>
          Buy Now
        </div>
      )}
     {isChartVisible && (<div className = "size-chart">
         
         <div className='chart-container'>
        <div className="remove-chart" onClick={()=>{handleSizeChart()}}><b>X</b></div>
          <div><center><h3>Size Guide</h3></center></div>
          <div className='chart'><img src="/assets/size-chart/1.png" alt = "size-chart"></img></div>
          <div className='guide'><img src="/assets/size-chart/2.png" alt = "size-chart"></img></div>
          
         </div>

      </div>)} 
    </div>
  )
}

export default Product
