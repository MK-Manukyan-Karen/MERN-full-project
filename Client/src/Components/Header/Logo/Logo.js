import React from 'react';
import style from './Logo.module.css';
import { NavLink } from 'react-router-dom';
import GlowingTextAnimation from './GlowingTextAnimation/GlowingTextAnimation';
import sound from '../../../Assets/audio/sound6.mp3';
import logo from '../../../Assets/Images/logo.png';




const Logo = React.memo((props) => {


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
    <div className={style.wrapper}>
      
      <div className={style.paragraphWrapper} onClick={buttonClick}>
        <NavLink to='/home' className={style.link}>
          <img src = {logo} alt = 'logo' />
          <GlowingTextAnimation paragraph = 'sport style'/>
        </NavLink>
      </div>

    </div>
  )
})

export default Logo;

