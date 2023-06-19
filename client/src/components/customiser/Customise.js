import React , { useState} from 'react';
import { Canvas } from '@react-three/fiber';
import Viewer from './Viewer.js';
import { OrbitControls ,ContactShadows } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
// import Signin from './components/signin/signin.js';
import './css/customise.css';
import { NavLink } from 'react-router-dom';
// import { useParams } from "react-router-dom";

import {BsCurrencyRupee }from  "react-icons/bs";
import {FaCheck }from  "react-icons/fa";
import {GiHamburgerMenu }from  "react-icons/gi";
import {IoIosArrowBack }from  "react-icons/io";
import {IoIosArrowForward }from  "react-icons/io";
import {AiOutlineReload }from  "react-icons/ai";
import {BsShuffle }from  "react-icons/bs";
//-----------------------------------------------    local file access     --------------------------------------------//
import {textures} from './texture.js';

// import {shoe} from './shoe.js';
import {shoes} from './shoes.js';

// var txt = textures.perforated;
var shoe = shoes[8385974993212] ;
console.log(shoe);

var texture = [];
var color = [];
for(var k = 0 ; k < shoe.components.length ; k++){
   texture[k] = 0;
   color[k] = 0;
}

console.log(color);
console.log("HELLO");


var component = shoe.components[0].meshName;

function Customise() {
  //  const params = useParams();
     
  

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
//Handle Texture Change
function handleTexture(id){
   console.log(texture);
   var txture  = textures[id];
   setCol(shoe.components[i].textures[texture[i]].color[0].code);
   var textureLoader = new TextureLoader();
   const c = textureLoader.load(txture.colorMap);
   const h = textureLoader.load(txture.heightMap);
   const n =  textureLoader.load(txture.normalMap);
   const r = textureLoader.load(txture.roughnessMap);
   const a = textureLoader.load(txture.aoMap);

                   c.repeat.set(5   , 5   );
                   h.repeat.set(5   , 5   );
                   n.repeat.set(5   , 5   );
                   r.repeat.set(5   , 5   );

                   c.wrapS = c.wrapT = THREE.RepeatWrapping;
                   n.wrapS = n.wrapT = THREE.RepeatWrapping;
                   h.wrapS = h.wrapT = THREE.RepeatWrapping;
                   r.wrapS = r.wrapT = THREE.RepeatWrapping;

                   c.magFilter = c.minFilter = THREE.NearestFilter;
                   n.magFilter = n.minFilter = THREE.NearestFilter;
                   h.magFilter = h.minFilter = THREE.NearestFilter;
                   r.magFilter = r.minFilter = THREE.NearestFilter;
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
     setJ(j);  handleTexture(item.id);console.log(item.id)}}>{item.name}</div>)
             })

function handleColor(id){
  setCol(id);
}

//color Button from shoe.js
const colorButtons = [];
shoe.components[i].textures[texture[i]].color.forEach((item , index)=>{
                 colorButtons.push(<div key= {index} className = "color-name"  onClick={()=>{color[i] = index ; console.log(item);handleColor(item.code)}}>{item.name}</div>)
             }) 

          component = shoe.components[i].meshName ;
          
// setComponent(shoe.components[i].meshName);

//Details Button for all the components of the shoes
const detailButtons = [];
shoe.components.forEach((item  , index)=>{
  detailButtons.push(<div className={`component-items`} onClick={()=>{setFlag(false) ;setI(index); setJ(texture[i]); setBlink(true)}}> {item.name} <FaCheck className={ i!==index ? 'component-item-check' : ''}/> </div>);

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
    <div className = "brand-active"><center><img src = "assets/icons/brand-logo.svg" alt = "Milanese"/></center>
    <div className = "edit-function"> 
      <div className = "edit-function-name " onClick={()=>{
        setIsStartOver(!isStartOver);
      }}>Start over<span><AiOutlineReload /></span></div>
      <div className = "edit-function-name ">Randomise <span><BsShuffle/></span></div>
    </div>
    </div>


        <Canvas shadows camera={{ position: [ 3 ,3 ,0], fov: 50 }} scale = {[1,1,1]} style={{ background: "#FFFFFF" }}>
          <axesHelper args={[5]} />
          <directionalLight  intensity={0.5} position={[0, 20, 10]}castShadow />
          <ambientLight intensity={0.5} />
          <spotLight intensity={1} angle={0.5} penumbra={0} position={[0 , 1000, 0]} castShadow />
          <hemisphereLight intensity={0.8} color="white" groundColor="black" />
           <Viewer shoe = {shoe.link} blink ={blink} component={component}  update = {flag} ConClick = {getComponent} color = {col} colorMap = {colorMap}    heightMap = {heightMap} normalMap ={normalMap} roughnessMap = {roughnessMap} aoMap = {aoMap} isStartOver={isStartOver}/>
          
           <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
          <OrbitControls minPolarAngle={Math.PI/6} maxPolarAngle={Math.PI} enableZoom={true} enablePan={false} />
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




        <div className = "done-div-container done-div-container-2">
           <div className = "left"><div><span className = "price"> <BsCurrencyRupee/> {shoe.price}</span><span><br/>  Expected delivery in 1 week</span></div>
           </div>
           <div className = "right"><NavLink to={`/checkout`}><div className = "done">Done </div></NavLink> </div>
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
