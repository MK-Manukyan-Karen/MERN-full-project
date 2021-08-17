import React from 'react';
import style from './SocialWebIcon.module.css';
import { NavLink } from 'react-router-dom';
import {CgFacebook} from 'react-icons/cg';
import {CgInstagram} from 'react-icons/cg';
import {GrTwitter} from 'react-icons/gr';
import {ImGooglePlus} from 'react-icons/im';

const SocialWebIcon = React.memo ( (props) => {
    return (
        <div className={style.container}>
         
                <div className = {style.iconWrapper}>
                    <NavLink to='/login' className = { `${style.link} ${style.linkFacebook}`}>
                      <CgFacebook />
                    </NavLink>
                </div>
                <div className = {style.iconWrapper}>
                    <NavLink to='/login' className = {`${style.link} ${style.linkInstagram}` }>
                        <CgInstagram />
                   </NavLink>
                </div>
                <div className = {style.iconWrapper}>
                    <NavLink to='/login' className = {`${style.link} ${style.linkTwitter}`}>
                        <GrTwitter />
                   </NavLink>
                </div>
                <div className = {style.iconWrapper}>
                    <NavLink to='/login' className = {`${style.link} ${style.linkGoogle}`}>
                        <ImGooglePlus />
                   </NavLink>
                </div>
        </div>
    )
})

export default SocialWebIcon;