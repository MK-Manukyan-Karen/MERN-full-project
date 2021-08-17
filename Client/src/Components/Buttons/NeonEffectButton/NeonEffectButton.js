import React from 'react';
import './NeonEffectButton.css';

export const NeonEffectButton = React.memo( (props) => {
  const [backgroundColor, setBackgroundColor] = React.useState(props.backgroundColor ? props.backgroundColor : '#333')
  const [color, setColor] = React.useState(props.color ? props.color : '#15f4ee')
  const [delay, setDelay] = React.useState(props.hoverDelay ? props.hoverDelay : '0.7s')
  const [shadow, setShadow] = React.useState(null)

  const hoverEffectOver = () => {
    setBackgroundColor(props.backgroundHoverColor ? props.backgroundHoverColor : '#15f4ee')
    setColor(props.hoverTextColor ? props.hoverTextColor : '#333')
    setShadow(props.hoverBoxShadow ? props.hoverBoxShadow : '0 0 10px #15f4ee')
    setDelay(delay)
  }

  const hoverEffectOut = () => {
        setBackgroundColor(props.backgroundColor ? props.backgroundColor : '#333')
        setColor(props.color ? props.color : '#15f4ee')
        setShadow(null)
        setDelay(null)
  }

  return (
    <div className="buttonWrapper">
      <button  style = {{...props.style,
                        color : color,
                        backgroundColor : backgroundColor,
                        transitionDelay : delay,
                        boxShadow : shadow,
                        width : props.width,
                        height : props.height,
                        margin : props.margin,
                        padding : props.padding,
                        fontSize:props.fontSize
                        }}
              onMouseOver={hoverEffectOver}
              onMouseOut={hoverEffectOut}                        
              className='button'>
        <span style = {{background:`linear-gradient(90deg,transparent, ${props.hoverEffectColor 
                                                                        ? props.hoverEffectColor
                                                                        : '#15f4ee'})`}}
              className="button__line button__line__top">
        </span>
        <span style = {{background:`linear-gradient(180deg,transparent,${props.hoverEffectColor 
                                                                        ? props.hoverEffectColor
                                                                        : '#15f4ee'})`}} 
              className="button__line button__line__right">
        </span>
        <span style = {{background:`linear-gradient(270deg,transparent,${props.hoverEffectColor 
                                                                        ? props.hoverEffectColor
                                                                        : '#15f4ee'})`}}
              className="button__line button__line__bottom">
        </span>
        <span style = {{background:`linear-gradient(0deg,transparent,${props.hoverEffectColor 
                                                                        ? props.hoverEffectColor
                                                                        : '#15f4ee'})`}}
              className="button__line button__line__left">
        </span>
        {props.children}
      </button>
    </div>
  );
})