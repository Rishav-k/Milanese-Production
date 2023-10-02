

const Selectordesktop =({ToggleshowSelectorDesktop , textureButtons,colorButtons})=>{
    return(<div>
    {ToggleshowSelectorDesktop &&
        <div className='selectors-desktop'>
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
        }
</div>
)}

export default Selectordesktop;