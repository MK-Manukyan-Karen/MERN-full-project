import React from 'react';
import style from './ButtonHoverGradients.module.css';
import sound from '../../../Assets/audio/button5.mp3';

export const ButtonHoverGradients = React.memo ( (props) => {

  const buttonSound = new Audio(sound)
  const playBtnSound = () => {
         buttonSound.volume = 0.1
         buttonSound.play()
  }
 
  const buttonClick = () => {
    if(props.callback){
      props.callback()
    }
    playBtnSound()
  }

  return (
      <button className = {style.btn} onClick = {buttonClick} >
        {props.name}
      </button>
  )
})
