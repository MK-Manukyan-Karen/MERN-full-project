import React from 'react';
import style from './Item.module.css';
import { NavLink } from 'react-router-dom';
import sound from '../../../../Assets/audio/sound6.mp3';



const Item = React.memo ( ({ path,cName,title,toggleSideBar,indicator}) => {

 
  const playBtnSound = () => {
   const buttonSound = new Audio(sound)
         buttonSound.volume = 0.2
         buttonSound.play()
  }
 
  const buttonClick = () => {
    playBtnSound()
    toggleSideBar(false)
  }
    return (
        
      <li className = {style.linkWrapper}>
                  <NavLink to={path} className={style[cName]}  onMouseMove={indicator} data-text = {title}
                           onClick = {buttonClick} activeClassName={style.activeLink} >
                      {title}
                  </NavLink>
                
      </li>
    )
  })

  export default Item;

