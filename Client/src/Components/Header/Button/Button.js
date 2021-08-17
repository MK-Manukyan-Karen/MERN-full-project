import React from 'react';
import style from './Button.module.css';
import NeonAnimationButton from '../../Buttons/NeonAnimationButton/NeonAnimationButton';
import { NavLink } from 'react-router-dom';
import sound from '../../../Assets/audio/sound6.mp3';


const Button = React.memo( (props) => {


  const playBtnSound = () => {
   const buttonSound = new Audio(sound)
         buttonSound.volume = 0.2
         buttonSound.play()
  }
 
  const buttonClick = () => {
    playBtnSound()
    props.toggleSideBar(false)
  }

  return (
    <div className={style.buttonWrapper}>
      <div onClick={buttonClick}>
        <NavLink to='/auth/login' className={style.linkLogin}>
     
          <NeonAnimationButton name = 'Մուտք'
                               hoverColor = '#1ff403'
                               textColor = '#1ff403'
                               shadow = ' 0 0 2px #1ff403, 0 0 4px #1ff403, 0 0 8px #1ff403, 0 0 30px #1ff403'
                               animationColor = '#1ff403'

          />
        </NavLink>
      </div>
      <div onClick={buttonClick}>
        <NavLink to='/auth/register' className={style.linkLogin}>
          <NeonAnimationButton name = {'Գրանցում'}/>
        </NavLink>
      </div>
    </div>
  )

})
export default Button;