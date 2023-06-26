import React , { useState ,useEffect ,useContext} from 'react';
import { Canvas } from '@react-three/fiber';
import Viewer from './Viewer.js';
import { OrbitControls ,ContactShadows } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
// import Signin from './components/signin/signin.js';
import './css/customise.css';
import { Link } from 'react-router-dom';
// import { useParams } from "react-router-dom";

import {BiDownload }from  "react-icons/bi";
import {BsCurrencyRupee }from  "react-icons/bs";
import {FaCheck }from  "react-icons/fa";
import {GiHamburgerMenu }from  "react-icons/gi";
import {IoIosArrowBack }from  "react-icons/io";
import {IoIosArrowForward }from  "react-icons/io";
import {AiOutlineReload }from  "react-icons/ai";
import {BsShuffle }from  "react-icons/bs";
//-----------------------------------------------    local file access     --------------------------------------------//
import {textures} from './texture.js';
import {sole} from './sole.js';
// import {shoe} from './shoe.js';
// import {shoes} from './shoes.js';


//-----------------------------------------Contexts ------------------------------------------------------//
import ProductContext from '../context/ProductContext';

// var txt = textures.perforated;
// var shoe = shoes[8385974993212] ;
// console.log(shoe);
// console.log(textures[moorlandGrain]);
// console.log(sole.bootSole);
var texture = [];
var color = [];
for(var k = 0 ; k <10 ; k++){
   texture[k] = 0;
   color[k] = 0;
}

console.log("HELLO");
var component;
function initials(shoe){
  component = shoe.components[0].meshName;
}
// var component = shoe.components[0].meshName;

function Customise({shoe}) {
  const {  product } = useContext(ProductContext);
  //  const params = useParams();
     useEffect(()=>{
      initials(shoe);
     })
     console.log(texture);
     console.log(color);
  

     const [flag , setFlag] = useState(false);
     const [showDetails , setShowDetails] = useState(false);
     const [i , setI] = useState(0);
     const [j , setJ] = useState(0);
     const [blink , setBlink] = useState(false);
     const [col ,setCol] = useState(shoe.components[i].textures[texture[i]].color.code)
     

     const [isStartOver , setIsStartOver] = useState(false);
   //  const [component ,setComponent] = useState(shoe.components[0].meshName);
    // const [texture , setTexture] = useState('');
    function getComponent(name){
      for(var k = 0 ; k < shoe.components.length ; k++){
         if(shoe.components[k].meshName === name){
            setFlag(false);
            setI(k);
            setBlink(true);

         }
      }
      // component = name;
      // console.log(component);
        }
     
//Textures File

//Texture States 
const [colorMap , setColorMap] = useState(null);  
const [heightMap , setHeightMap] = useState(null);
const [normalMap , setNormalMap] = useState(null);
const [roughnessMap , setRoughnessMap] = useState(null);  
const [aoMap , setAoMap] = useState(null); 
const [soleLink , setSoleLink] = useState(sole[shoe.sole[0].id].link)
const [soleId , setSoleId] = useState(shoe.sole[0].id);
//Handle Texture Change
function handleTexture(id){
  //  console.log(texture);
   var txture  = textures[id];
   console.log(txture);
   setCol(shoe.components[i].textures[texture[i]].color[0].code);
   var textureLoader = new TextureLoader();
   const c = textureLoader.load(txture.colorMap);
   const h = textureLoader.load(txture.heightMap);
   const n = textureLoader.load(txture.normalMap);
   const r = textureLoader.load(txture.roughnessMap);
   const a = textureLoader.load(txture.aoMap);

                   c.repeat.set(2  , 2  );
                   h.repeat.set(2  , 2  );
                   n.repeat.set(2  , 2  );
                   r.repeat.set(2  , 2  );
                   a.repeat.set(2  , 2  )

                   c.wrapS = c.wrapT = THREE.RepeatWrapping;
                   n.wrapS = n.wrapT = THREE.RepeatWrapping;
                   h.wrapS = h.wrapT = THREE.RepeatWrapping;
                   r.wrapS = r.wrapT = THREE.RepeatWrapping;
                   a.wrapS = a.wrapT = THREE.RepeatWrapping;

                   c.magFilter = c.minFilter = THREE.NearestFilter;
                   n.magFilter = n.minFilter = THREE.NearestFilter;
                   h.magFilter = h.minFilter = THREE.NearestFilter;
                   r.magFilter = r.minFilter = THREE.NearestFilter;
                   a.magFilter = a.minFilter = THREE.NearestFilter;
   setColorMap(c);
   setHeightMap(h);
   setNormalMap(n);
   setRoughnessMap(r);
   setAoMap(a);
}
// Camera Positions




//Texture Buttons from shoe.js
const textureButtons = [];
shoe.components[i].textures.forEach((item , index)=>{
   textureButtons.push(<div key = {index} className = "texture-name" name={item.id} onClick={()=>{ setFlag(true); texture[i] = index;
     setJ(j);  handleTexture(item.id);console.log(item.id);}}><div className = {texture[i] === index ? 'texture-image-active' : 'texture-image'} ><img src ={textures[item.id].icon_link} alt = "Loading..." /></div><div className='small-texture-name'>{textures[item.id].name}</div></div>)
             })

function handleColor(id){
  setCol(id);
}

//color Button from shoe.js
const colorButtons = [];
shoe.components[i].textures[texture[i]].color.forEach((item , index)=>{
                 colorButtons.push(<div key= {index} className = "color-name"  onClick={()=>{color[i] = index ; console.log(item);handleColor(item.code);}}><div className={color[i]===index ? "small-color-div-active":"small-color-div"} style={{ backgroundColor: item.code }}></div>
<div className="small-color-name">{item.name}</div></div>)
             }) 


      component = shoe.components[i].meshName ;
          
// setComponent(shoe.components[i].meshName);

//Details Button for all the components of the shoes
const detailButtons = [];
shoe.components.forEach((item  , index)=>{
  detailButtons.push(<div className={`component-items`} onClick={()=>{setFlag(false) ;setI(index); setJ(texture[i]); setBlink(true)}}> {item.name} <FaCheck className={ i!==index ? 'component-item-check' : ''}/> </div>);

});


// Sole Buttons 

const soleButtons = [];
shoe.sole.forEach((item , index)=>{
  soleButtons.push(<div className = "sole-name" onClick = {()=>{ setSoleId(item.id); setSoleLink(sole[item.id].link)}}> <div className = {soleId === item.id ? "sole-image-active" : "sole-image"} > <img src = {sole[item.id].icon} alt = "img" /> </div>   <div className='small-sole-name'> {sole[item.id].name} </div>  </div>)
})

// const viewerElement = [];
// shoe.components.forEach((item , index)=>{
// })
var divStyle = {

    backgroundColor: {col}
  };

  return (<div className = "app">
      <div className = "customiser-view">


    <div className="customise">
    <div className = "brand-active"><center><img src = "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/Logo/brand-logo.svg" alt = "Milanese"/></center>
    <div className = "edit-function"> 
      <div className = "edit-function-name " onClick={()=>{
        setIsStartOver(!isStartOver);
      }}>Start over<span><AiOutlineReload /></span></div>
      <div className = "edit-function-name ">Randomise <span><BsShuffle/></span></div>
    </div>
    </div>
      <button onClick={() => {
  const link = document.createElement('a')
  link.setAttribute('download', 'Your_Custom_Shoes.jpg')
  link.setAttribute('href', document.querySelector('canvas').toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream'))
  link.click()
}} ><BiDownload/></button>
        <Canvas shadows camera={{ position: [ 8 ,10 ,0], fov: 20 }} style={{ background: "#FFFFFF" }} gl={{ preserveDrawingBuffer: true }} scale = {[1,1,1]} >
          {/* <axesHelper args={[5]} /> */}
          {/* <Environment files="./assets/env.exr" background blur={0.5} /> */}
          <directionalLight  intensity={0.1} position={[0, 10, 10]} castShadow shadow-mapSize-height={1024}
  shadow-mapSize-width={1024}/>
          <directionalLight  intensity={0.5} position={[0, -0.5, 0]} />
          {/* <ambientLight intensity={0.5} /> */}
          <spotLight intensity={1} angle={0.5} penumbra={0} position={[0 , 1000, 0]} castShadow />
          <hemisphereLight intensity={0.8} color="white" groundColor="black" />
           <Viewer shoe = {shoe.link} blink ={blink} component={component}  update = {flag} ConClick = {getComponent} color = {col} colorMap = {colorMap}    heightMap = {heightMap} normalMap = {normalMap} roughnessMap = {roughnessMap} aoMap = {aoMap} isStartOver={isStartOver} soleLink = {soleLink} />
          
           <ContactShadows position={[0, -0.9, -0.05]} opacity={1} scale={20} blur={1} far={1} />
          <OrbitControls minPolarAngle={Math.PI/12} maxPolarAngle={Math.PI*9/13} enableZoom={true} enablePan={false} />
       </Canvas>

      <div className = "editor" style = {divStyle} >
         <div className = "components" >
              <div className ="left-arrow arrow"><IoIosArrowBack onClick={()=>{ setFlag(false) ; i > 0 ? setI(i-1) : setI(shoe.components.length-1); setJ(texture[i]); setBlink(true)}}/></div>
              <div className = "component-name">{shoe.components[i].name} {" "} <span className = "component-counter"> {i+1 +"/" + shoe.components.length }</span></div>
              <div className="right-arrow arrow"><IoIosArrowForward onClick={()=>{setFlag(false) ; i < shoe.components.length-1 ? setI(i+1) : setI(0); setJ(texture[i]); setBlink(true)}} /></div>
         </div>

         <div className="details">
            <div className = "hamburger-icon"><GiHamburgerMenu onClick={()=>{
              setShowDetails(!showDetails)
            }} /></div>
            <div className={`menu  ${showDetails ? 'open' : ''}`}>
                <div><h3><center>Shoes Anatomy</center></h3><span className = "close-details" onClick={()=>{setShowDetails(!showDetails)}}>X</span></div>
                <div className='arrange'>
                <div>{detailButtons}</div>
                </div>
            </div>
        </div>

       <div className = "selector-name">
         <div className = "selector-type"><span className = "selector-type-txt">Leather</span></div>
         <div className = "textures">
             {textureButtons}
         </div>
       </div>  

        <div className = "selector-name">
          <div className = "selector-type"><span className = "selector-type-txt">Color</span></div>
             <div className= "textures">
                 {colorButtons}
             </div>
        </div>
      
        </div>
        <hr></hr>
        <div className='selector-name'> 
          <div className = "selector-type"><span className = "selector-type-txt">sole</span></div>
          {soleButtons}
          {/* <div><button onClick = {()=>{
            setSoleLink(sole.plainSole.link)
          }}>sole1</button><button onClick = {()=>{
            setSoleLink(sole.bootSole.link)
          }}>sole2</button></div> */}
        </div>

        <div className = "done-div-container done-div-container-2">
           <div className = "left"><div><span className = "price"> <BsCurrencyRupee/> {product.price}</span><span><br/>  Expected delivery in 1 week</span></div>
           </div>
           <div className = "right"><Link to={`address`}><div className = "done"><span>Done </span></div></Link> </div>
        </div>
    </div>
      
      </div>
      {/* <div className = "address" id="address" >
       <Address />
      </div> */}
      
    </div>
  );
}

export default Customise;
