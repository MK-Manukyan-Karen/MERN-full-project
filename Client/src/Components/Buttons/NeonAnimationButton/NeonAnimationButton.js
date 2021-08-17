import React from 'react';
import style from './NeonAnimationButton.module.css';

 const NeonAnimationButton = React.memo( (props) => {
    const [hoverColor, setHoverColor] = React.useState(null)
    const [color, setColor] = React.useState(props.textColor ? props.textColor : '#03e9f4')
    const [shadow, setShadow] = React.useState(null)


  const hoverEffectOver = () => {
    setHoverColor(props.hoverColor ? props.hoverColor : '#03e9f4')
    setColor('#050801')
    setShadow(props.shadow ? props.shadow : ' 0 0 2px #03e9f4, 0 0 4px #03e9f4, 0 0 8px #03e9f4, 0 0 30px #03e9f4')
  }

  const hoverEffectOut = () => {
    setHoverColor(null)
    setColor(props.textColor ? props.textColor : '#03e9f4')
    setShadow(null)
  }
  

  return (

      <button className = {style.button} 
              style = {{...props.style,
                        background : hoverColor,
                        color : color,
                        boxShadow :shadow,
                        width : props.width,
                        height : props.height,
                        margin : props.margin,
                        padding : props.padding,
                        fontSize:props.fontSize,
                        marginTop : props.marginTop
                        }}
              onMouseOver={hoverEffectOver}
              onMouseOut={hoverEffectOut}                        
        >
        <span style = {{background:`linear-gradient(90deg,transparent, ${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}}
              className="button__line button__line__top">
        </span>
        <span style = {{background:`linear-gradient(180deg,transparent,${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}} 
              className="button__line button__line__right">
        </span>
        <span style = {{background:`linear-gradient(270deg,transparent,${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}}
              className="button__line button__line__bottom">
        </span>
        <span style = {{background:`linear-gradient(0deg,transparent,${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}}
              className="button__line button__line__left">
        </span>
        {props.name}
      </button>

  );
})

export default NeonAnimationButton