import React from 'react';
import style from './Basket.module.css'
import { NavLink } from 'react-router-dom';
import backpack from '../../../Assets/Images/backpack.png';
import sound from '../../../Assets/audio/sound6.mp3';


const Basket = React.memo((props) => {

   
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
        <div className={style.basketWrapper} onClick = {buttonClick}>
            <NavLink to='/orders' className={style.basket}>
                <span className={style.infoQuantity}>
                    {props.quantityProduct ? props.quantityProduct : 0}
                </span>
                <img  className = {style.image} src = {backpack} alt = 'backpack'/>
            </NavLink>

        </div>
    )
})

export default Basket;

