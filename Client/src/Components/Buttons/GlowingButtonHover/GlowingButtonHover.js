import React from 'react';
import style from './GlowingButtonHover.module.css';


const GlowingHoverButton = React.memo( (props) => {
    return (
      <div className="continer" > 
      
          <div className = {style.buttonWrapper}  
               style = {{
                         width: props.width1
                        }}>
              <a href = {props.link} className = {style.button} target="_blank" rel="noreferrer"
                 style = {{
                            width: props.width2
                           }}>
                {props.text}
              </a>
            <span></span>
            <span></span>
          </div>
  
      </div>
    );
  })


  export default GlowingHoverButton