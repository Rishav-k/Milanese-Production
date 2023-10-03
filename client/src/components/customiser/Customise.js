import React , { useState ,useEffect ,useContext} from 'react';
import { Canvas } from '@react-three/fiber';
import Viewer from './Viewer.js';
import { OrbitControls ,ContactShadows } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import * as THREE from 'three';
// import Signin from './components/signin/signin.js';
import './css/customise.css';
import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";
// import { Environment } from '@react-three/drei'

import {HiOutlineDownload }from  "react-icons/hi";
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
import ImageContext from '../context/ImageContext.js';
import CustomContext from '../context/CustomContext.js';
import SoleContext from '../context/SoleContext.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons' 
import Selectordesktop from './Selectordesktop.js';

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

// console.log("HELLO");
var component;
function initials(shoe){
  component = shoe.components[0].meshName;
}
// var component = shoe.components[0].meshName;

function Customise({shoe}) {
  const navigate = useNavigate();
  const {  product } = useContext(ProductContext);
  const {updateImageUrl} = useContext(ImageContext);
  const {updateCustomData} = useContext(CustomContext);
  const {soleNo , updateSoleNo} = useContext(SoleContext);
  //  const params = useParams();
     useEffect(()=>{
      initials(shoe);
     })
    //  console.log(texture);
    //  console.log(color);
    
     
    
     
     const [showItem , setShowItem]=useState();
     const [ToggleshowSoleDesktop , setToggleShowSoleDesktop]=useState(false);
    
     
     const [repeat , setRepeat] = useState(1);
     if(repeat === 1){setRepeat(3)};

     const [flag , setFlag] = useState(false);
     const [showDetails , setShowDetails] = useState(false);
     const [i , setI] = useState(0);
     const [j , setJ] = useState(0);
     const [blink , setBlink] = useState(false);
     const [col ,setCol] = useState(shoe.components[i].textures[texture[i]].color[0].code);
     
     const [soleId , setSoleId] = useState(shoe.sole[soleNo].id);
     const [soleLink , setSoleLink] = useState(sole[soleId].link)
     console.log(i);
    //  console.log(shoe.components[i].textures[texture[i]].color[0].code);
    // const [colUpdate ,setColorUpdate] = useState(false);     
    const [tupdate , setTupdate] = useState(false);
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
const [k ,setK] = useState(0);
const [colorMap , setColorMap] = useState(null);  
const [heightMap , setHeightMap] = useState(null);
const [normalMap , setNormalMap] = useState(null);
const [roughnessMap , setRoughnessMap] = useState(null);  
const [aoMap , setAoMap] = useState(null); 

//Handle Texture Change
function handleTexture(id){
  //  console.log(texture);
   var txture  = textures[id];
  //  console.log(txture);
  //  setCol(shoe.components[i].textures[texture[i]].color[0].code);
   var textureLoader = new TextureLoader();
   const c = textureLoader.load(txture.colorMap);
   const h = textureLoader.load(txture.heightMap);
   const n = textureLoader.load(txture.normalMap);
   const r = textureLoader.load(txture.roughnessMap);
   const a = textureLoader.load(txture.aoMap);
   console.log(c);
   console.log(" hii i am texture ");

                   c.repeat.set(repeat , repeat );
                   h.repeat.set(repeat , repeat );
                   n.repeat.set(repeat , repeat );
                   r.repeat.set(repeat , repeat );
                   a.repeat.set(repeat , repeat )

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
   textureButtons.push(<div key = {index} className = "texture-name" name={item.id} onClick={()=>{ setFlag(true); color[i]=k ; texture[i] = index; setTupdate(true);
     setJ(j);  handleTexture(item.id);console.log(item.id);}}><div className = {texture[i] === index ? 'texture-image-active' : 'texture-image'} ><img src ={textures[item.id].icon_link} alt = "Loading..." /></div><div className='small-texture-name'>{textures[item.id].name}</div></div>)
             })

function handleColor(id){
  setCol(id);
}

//color Button from shoe.js
const colorButtons = []; 
shoe.components[i].textures[texture[i]].color.forEach((item , index)=>{
                 colorButtons.push(<div key= {index} className = "color-name"  onClick={()=>{color[i] = index ;setTupdate(false); setFlag(true); setK(color[i]);console.log(item);handleColor(item.code);}}><div className={color[i]===index ? "small-color-div-active":"small-color-div"} style={{ backgroundColor: item.code }}></div>
<div className="small-color-name">{item.name}</div></div>)
             }) 


      component = shoe.components[i].meshName ;
          
// setComponent(shoe.components[i].meshName);

//Details Button for all the components of the shoes
const detailButtons = [];
shoe.components.forEach((item  , index)=>{
  detailButtons.push(<div className={`component-items`} onClick={()=>{setFlag(false) ;setI(index); setJ(texture[i]); setBlink(true)}}> {item.name} <FaCheck className={ i!==index ? 'component-item-check' : ''}/> </div>);

});

const desktopComponent = [];
shoe.components.forEach((item , index)=>{
  var show = false;
 if(showItem === index){
  show = true;
 }
   desktopComponent.push(<div key = {index}>
    <div className = "component-name">
      <div className='component-name-desktop'>{item.name} {" "}</div> 
      <div className='desktop-downArrow-icon' onClick={()=>{              setFlag(false) ; setI(index); setJ(texture[index]); setBlink(true) ;if(showItem === index){
        setShowItem(-1);
      }else{ setShowItem(index) ;} }}><FontAwesomeIcon icon={faAngleDown} /></div> 
      
      </div>
      <div>
        <Selectordesktop 
          ToggleshowSelectorDesktop={show}
          colorButtons={colorButtons} 
          textureButtons={textureButtons}
        />
      </div>
   </div>)
});



// Sole Buttons 

const soleButtons = [];
shoe.sole.forEach((item , index)=>{
  soleButtons.push(<div key = {index}  className = "sole-name" onClick = {()=>{ setSoleId(item.id);updateSoleNo(index); setSoleLink(sole[item.id].link)}}> <div className = {soleId === item.id ? "sole-image-active" : "sole-image"} > <img src = {sole[item.id].icon} alt = "img" /> </div>   <div className='small-sole-name'> {sole[item.id].name} </div>  </div>)
})

// const viewerElement = [];
// shoe.components.forEach((item , index)=>{
// })
var divStyle = {

    backgroundColor: {col}
  };

 const [imageUrlC, setImageUrlC] = useState('');

 //Send the Custom Data for the given shoes...

  const handleDisplay = async () => {
  const canvas = document.querySelector('canvas');
  const imageDataURL = canvas.toDataURL('image/png');
  setImageUrlC(imageDataURL);
  updateImageUrl(imageDataURL);
  console.log(imageUrlC);
   navigate('product')
  var custom = [];
  const promises = shoe.components.map(async (component, l) => {
    custom.push({"part" : component.name , "texture" : component.textures[texture[l]].id , "color" : component.textures[texture[l]].color[color[l]].name });
  });
  custom.push({"part" : "Sole" , "id" : soleId})
  await Promise.all(promises);
  console.log(custom);
  updateCustomData(custom);
};


  return (<div className = "app">
    <div className = "customiser-view">
    
    <div className = "brand-active"><center><img src = "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/Logo/brand-logo.svg" alt = "Milanese"/></center>
    <div className = "edit-function"> 
      <div className = "edit-function-name " onClick={()=>{
        setIsStartOver(!isStartOver);
      }}>Start over<span><AiOutlineReload /></span></div>
      <div className = "edit-function-name ">Randomise <span><BsShuffle/></span></div>
    </div>
    </div>
      {/* <div className='set-repeat'><span onClick={()=>{if(repeat>1)setRepeat(repeat-1);}}>-</span> {repeat} <span onClick={()=>setRepeat(repeat+1)}>+</span></div> */}

      <div className='shoes-name'>{product.title}</div>
      <div className="customise">
      <div className='download-button'><button onClick={() => {
  const canvas = document.querySelector('canvas');
    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.setAttribute('download', 'Your_Custom_Shoes.png');
      link.setAttribute('href', URL.createObjectURL(blob));
      link.click();
    }, 'image/png', 1.0);

}} ><HiOutlineDownload className='download-icon'/></button></div>

        <Canvas shadows camera={{ position: [ 8 ,10 ,0], fov: 20 }} style={{ background: "#FFFFFF" }} gl={{ preserveDrawingBuffer: true }} scale = {[1,1,1]} >
       
        {/* <Environment preset= "studio" background blur= {0.5} /> */}
          {/* <axesHelper args={[5]} /> */}
          {/* <Environment files="./assets/env.exr" background blur={0.5} /> */}
          <directionalLight  intensity={0.4} position={[10, 10, 10]} castShadow shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}/>
          <directionalLight  intensity={0.8} position={[0, -2, 0]} />
          {/* <ambientLight intensity={0.5} /> */}
          <spotLight intensity={1} angle={0.5} penumbra={0} position={[0 , 1000, 0]} castShadow />
          <hemisphereLight intensity={0.8} color="white" groundColor="black" />
           <Viewer shoe = {shoe.link} blink ={blink} component={component}  update = {flag} ConClick = {getComponent} color = {col} colorMap = {colorMap}    heightMap = {heightMap} normalMap = {normalMap} roughnessMap = {roughnessMap} aoMap = {aoMap} isStartOver={isStartOver} soleLink = {soleLink} updateTexture={tupdate}/>
           <OrbitControls minPolarAngle={Math.PI/12} maxPolarAngle={Math.PI*9/13} enableZoom={true} maxZoom = {1} enablePan={false} />
           <ContactShadows position={[0, -1.5 , -0.05]} opacity={1} scale={20} blur={1} far={1} />
          
       </Canvas>

      <div className = "editor" style = {divStyle} >
         <div className = "components" >
              <div className ="left-arrow arrow"><IoIosArrowBack onClick={()=>{ setFlag(false) ; i > 0 ? setI(i-1) : setI(shoe.components.length-1); setJ(texture[i]); setBlink(true)}}/></div>
              <div className = "component-name">{shoe.components[i].name} {" "} <span className = "component-counter"> {i+1 +"/" + shoe.components.length }</span></div>
              <div className="right-arrow arrow"><IoIosArrowForward onClick={()=>{setFlag(false) ; i < shoe.components.length-1 ? setI(i+1) : setI(0); setJ(texture[i]); setBlink(true)}} /></div>
         </div>

         <div className = "desktop-components" >
              <p>Select the shoe part to edit</p>  
              <div>
                {desktopComponent}
              </div>
{/* 
            <div className = "component-name">
                <div className='component-name-desktop'>{shoe.components[1].name} {" "}</div> 
                <div className='desktop-downArrow-icon' onClick={()=>{setToggleShowVampDesktop(!ToggleshowVampDesktop) ; setFlag(false) ; setI(1); setJ(texture[1]); setBlink(true)}}><FontAwesomeIcon icon={faAngleDown} /></div> 
                
              </div>
              <div>
              <Selectordesktop 
                  ToggleshowSelectorDesktop={ToggleshowVampDesktop}
                   colorButtons={colorButtons} 
                   textureButtons={textureButtons}
                  />
              </div>
             
              <div className = "component-name">
                <div className='component-name-desktop'>{shoe.components[2].name} {" "}</div> 
                <div className='desktop-downArrow-icon' onClick={()=>{setToggleShowQuarterDesktop(!ToggleshowQuarterDesktop) ; setFlag(false) ; setI(2); setJ(texture[2]); setBlink(true)}}><FontAwesomeIcon icon={faAngleDown} /></div> 
                
              </div>
              <div>
              <Selectordesktop 
                  ToggleshowSelectorDesktop={ToggleshowQuarterDesktop}
                   colorButtons={colorButtons} 
                   textureButtons={textureButtons}
                  />
              </div>
              <div className = "component-name">
                <div className='component-name-desktop'>{shoe.components[3].name} {" "}</div> 
                <div className='desktop-downArrow-icon' onClick={()=>{setToggleShowBackstripDesktop(!ToggleshowBackstripDesktop) ; setFlag(false) ; setI(3); setJ(texture[3]); setBlink(true)}}><FontAwesomeIcon icon={faAngleDown} /></div> 
               
              </div>
              <div>
              <Selectordesktop 
                   ToggleshowSelectorDesktop={ToggleshowBackstripDesktop}
                   colorButtons={colorButtons} 
                   textureButtons={textureButtons}
                  />
              </div>
              <div className = "component-name">
                <div className='component-name-desktop'>{shoe.components[0].name} {" "}</div> 
                <div className='desktop-downArrow-icon' onClick={()=>{setToggleShowToeDesktop(!ToggleshowToeDesktop) ; setFlag(false) ; setI(0); setJ(texture[0]); setBlink(true)}}><FontAwesomeIcon icon={faAngleDown} /></div> 
                
              </div> 
              <div>
              <Selectordesktop 
                  ToggleshowSelectorDesktop={ToggleshowToeDesktop}
                   colorButtons={colorButtons} 
                   textureButtons={textureButtons}
                  />
              </div> */}

            <div className= "component-name"> 
            <div className = 'component-name-desktop'>Sole</div>
            <div className='desktop-downArrow-icon' onClick={()=>{setToggleShowSoleDesktop(!ToggleshowSoleDesktop)}}><FontAwesomeIcon icon={faAngleDown} /></div> 
            </div>

            {ToggleshowSoleDesktop &&
            <div className='textures-sole'>{soleButtons}</div>
            }
            {/* <div><button onClick = {()=>{
              setSoleLink(sole.plainSole.link)
            }}>sole1</button><button onClick = {()=>{
              setSoleLink(sole.bootSole.link)
            }}>sole2</button></div> */} 

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

      <div className='selectors'>

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
      
        
        <div className='selector-name'> 
          <div className = "selector-type"><span className = "selector-type-txt">sole</span></div>
          {soleButtons}
          {/* <div><button onClick = {()=>{
            setSoleLink(sole.plainSole.link)
          }}>sole1</button><button onClick = {()=>{
            setSoleLink(sole.bootSole.link)
          }}>sole2</button></div> */}
        </div>
      </div>
      
 

      </div>
        <div className = "done-div-container done-div-container-2">
           <div className = "left"><div><span className = "price"> <BsCurrencyRupee/> {product.price}</span><span><br/>  Expected delivery in 1 week</span></div>
           </div>
           
           <div className = "right"><div onClick={handleDisplay}><div className = "done"><span>Done </span></div></div> </div>
        </div>
    </div>
      {/* <div><img src = {imageUrlC} alt = "canvas-img" /></div> */}
      </div>
      {/* <div className = "address" id="address" >
       <Address />
      </div> */}
      
    </div>
  );
}

export default Customise;
