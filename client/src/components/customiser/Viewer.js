import React , { useRef , useEffect ,Suspense} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import './css/customise.css';

const Viewer = (props) =>{ 
  console.log(props.isStartOver) ;
  const gltf = useLoader(GLTFLoader, props.shoe);
  const sole = useLoader(GLTFLoader , props.soleLink);
  
  // console.log(sole);
  // console.log(sole.materials[2])
  // sole.materials[2].color.set('#aaaaaa');
  console.log(props);
  // if(props.isStartOver === true){

//   const meshNames = Object.keys(gltf.nodes);

//     console.log(meshNames);
//     props.ConClick(meshNames[0]);
     
// }
useEffect(() => { 
    const objectName = props.component; 
    const object = gltf.scene.getObjectByName(objectName);
  if (object && props.update === true && props.updateTexture === false) {
      const clickedMaterial  = object.material;
      clickedMaterial.color.set(props.color); 
      console.log(clickedMaterial);
  }

    if (object && props.update === true && props.updateTexture === true) {
      //       const new_material=new THREE.MeshStandardMaterial({
//     map : props.colorMap,
//     normalMap : props.normalMap,
//     heightMap : props.displacementMap,
//     roughnessMap : props.roughnessMap
// });
// object.material=new_material;
// }
    const clickedMaterial  = object.material;
    console.log(clickedMaterial);   

  console.log(props.colorMap.source.data);
 
    clickedMaterial.map = props.colorMap;
    clickedMaterial.normalMap = props.normalMap;
    clickedMaterial.heightMap = props.heightMap;
    clickedMaterial.roughnessMap = props.roughnessMap;
    clickedMaterial.aoMap = props.aoMap;

    clickedMaterial.roughness = 0.6;
    clickedMaterial.metalness = 0;
    clickedMaterial.needsUpdate = true;
    
    clickedMaterial.color.set(props.color); 
  } 

 if (object && props.update === false) {
      const clickedMaterial = object.material.clone();
  // Modify the cloned material as needed
      object.material.color.set('#88ffff');
  setTimeout(() => {
    object.material = clickedMaterial;
  }, 600);

}

  },[props.component, props.update, props.normalMap, props.heightMap, props.roughnessMap, props.color, gltf.scene ,props.colorMap , props.aoMap , props.updateTexture]);


const shoeComponents = useRef(null);
const handleClick = (event) => {
    const clickedComponent = event.object;
    // clickedComponent.visible = !clickedComponent.visible;  
    console.log(clickedComponent);
    const clickedName = clickedComponent.name;

    props.ConClick(clickedName);
    event.stopPropagation();
  };
  return (
    
    <mesh onClick={handleClick} position={[0, -0.5 , 0]} rotation={[-0.2, 0, 0]} >
      <group group ref={shoeComponents} >
      <Suspense>
        <primitive object={gltf.scene} />
        <primitive object={sole.scene} />
       </Suspense>
      </group>
    </mesh>
    
)}
export default Viewer;  