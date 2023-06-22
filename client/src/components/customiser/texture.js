const textures = {
    plain : {
        name : "plain",
        id : "sole-texture",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/Plain/plain.jpg",
        // colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/Plain/plain.jpg"
    },
    floral:{
        name: "floral",
        id : "ML-11",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-11/M-11.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-11/M-11.png",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-11/M-11normalblur.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-11/M-11roughness+(1).png"
    },
    alligator : {
        name : "alligator",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/Alligator+leather/color_map.jpg",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/Alligator+leather/color_map.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/Alligator+leather/normal_map_opengl.jpg",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/Alligator+leather/roughness_map.jpg",
        aoMap :"https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/Alligator+leather/ao_map.jpg"
    },
    quartz : {
        name : "quartz",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-1-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-1/M-1.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-1/M-1normal-map.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-1/M-1roughness+ma.png"
    },
    net : {
        name : "net",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-2-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-2/M-2.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-2/M-2normal.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-2/M-2roughness+map.png"
    },
    stoned : {
        name : "stoned",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-3-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-3/M-3.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-3/M-3.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-3/M-3roughness+map.png"
    },
    hemp : {
        name : "hemp",
        id : "M-4",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-4-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-4/M-4.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-4/M-4.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-4/M-4roughness+map.png"
    },
    croco : {
        name : "croco",
        id : "M-5",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-5-icon.png", 
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-5/M-5.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-8/M-8normal+map.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-5/M-5roughness+map.png"
    },
    reptile : {
        name : "croco",
        id : "M-6",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-6-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-6/M-6.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-6/M-6normal.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-6/M-6roughness.png"
    },
    leaf : {
        name : "leaf",
        id : "M-7",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-7-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-7/M-7.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-7/M-7normal.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-7/M-7roughness.png"
    },
    softCroco : {
        name : "softCroco",
        id : "M-8",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-8-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-8/M-8.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-8/M-8normal+map.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-8/M-8roughness+map.png"
    },
    kite : {
        name : "kite",
        id : "M-9",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-9-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-9/M-9.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-9/M-9normal.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-9/M-9roughness+map.png"
    },
    gutting : {
        name : "gutting",
        id : "M-10",
        icon_link :"https://milaneseleather3d.s3.ap-south-1.amazonaws.com/texture_icons/M-10-icon.png",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-10/m-10.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-10/M-10normal.png",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/M-10/m-10roughness+map.png"
    },
    moorlandGrain : {
        name : "moorlandGrain",
        icon_link : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/moorlandGrain/baseColor.jpg",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/moorlandGrain/baseColor.jpg",
        heightMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/moorlandGrain/height.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/moorlandGrain/normal.jpg",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/moorlandGrain/roughness.jpg",

        // colorMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2FmoorlandGrain%2FbaseColor.jpg?alt=media&token=40d9bd9c-f86b-4ccf-ac33-a9fb3290c50e",
        // heightMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2FmoorlandGrain%2Fheight.jpg?alt=media&token=c79d397b-6ab6-419c-bce6-4c229973147d",
        // roughnessMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2FmoorlandGrain%2Fnormal.jpg?alt=media&token=21311713-8581-4a60-86ac-597ce81c825b"
    },
     fabric : {
        name : "fabric",
       colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/fabric/baseColor.jpg",
        heightMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/fabric/height.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/fabric/normal.jpg",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/fabric/roughness.jpg",

// colorMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Ffabric%2FLeather_008_Base%20Color.jpg?alt=media&token=b1c53365-843f-4655-9f41-bdbc874bf8b5",
        // normalMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Ffabric%2FLeather_008_Normal.jpg?alt=media&token=1063319b-60df-41a5-97ae-515bc3134855",
        // heightMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Ffabric%2FLeather_008_Height.png?alt=media&token=6a009c82-0717-4049-beb4-7b1bf557ad9e",
        // roughnessMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Ffabric%2FLeather_008_Roughness.jpg?alt=media&token=b41c2ca3-1603-4dbc-8118-76203a246028"
    },
     perforated : {
        name : "perforated",
        colorMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/perforated/baseColor.jpg",
        heightMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/perforated/height.jpg",
        normalMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/perforated/normal.jpg",
        roughnessMap : "https://milaneseleather3d.s3.ap-south-1.amazonaws.com/textures/perforated/roughness.jpg",

        // colorMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Fperforated%2FbaseColor.jpg?alt=media&token=fe866bf2-bc7d-42ec-b6c0-4ebede2f44f5",
        // normalMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Fperforated%2Fnormal.jpg?alt=media&token=0abf2efb-ec73-4c10-b049-0fbe092fc5f3",
        // heightMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Fperforated%2Fheight.png?alt=media&token=33f33cad-cdb0-4436-a2bd-039876046395",
        // roughnessMap : "https://firebasestorage.googleapis.com/v0/b/milanese-leather.appspot.com/o/Textures%2Fperforated%2Froughness.jpg?alt=media&token=15cf1e32-78fe-4f94-aed8-bf619b1dbad2"
    }
    
}

module.exports = {textures}