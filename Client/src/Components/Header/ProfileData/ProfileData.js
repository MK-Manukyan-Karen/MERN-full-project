import React from 'react';
import style from './ProfileData.module.css';
import userIcon from '../../../Assets/Images/userIcon.png';
import { NavLink } from 'react-router-dom';
import sound from '../../../Assets/audio/sound6.mp3';
import { Button3D } from '../../Buttons/Button3D/Button3D';



const ProfileData = React.memo((props) => {

    const playBtnSound = () => {
     const buttonSound = new Audio(sound)
           buttonSound.volume = 0.2
           buttonSound.play()
    }
   
    const buttonClick = () => {
      playBtnSound()
      props.toggleSideBar(false)
    
    }

    const logOut = () => {
        playBtnSound()
        props.logOut()
    }

    return (

        <div className={style.container}>

            <NavLink to={props.isAuth ? '/myProfile/edit' : '/auth/login'} className={style.link}>
                <div className={style.wrapper} onClick={buttonClick}>
                    <img src={props.userPhoto ? `http://localhost:5000/${props.userPhoto}` : userIcon}
                         className={style.photo}
                         alt='userPhoto' />
                    <span className={style.info}>{props.userName}</span>
                </div>
            </NavLink>
            <Button3D front = {'Ելք'} back = {'Վստահ եք'} callBack = {logOut}/>
        </div>
    )
})

export default ProfileData;
