import React from 'react';
import style from './Footer.module.css';
import SocialWebIcon from './socialWebIcon/SocialWebIcon';
import {FaRegCopyright} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const Footer = React.memo ( () => {
    return (
        <div className = {style.footerContainer}>
            <div className = {style.socialWebIconWrapper}>
              <SocialWebIcon />
            </div>
            <div className = {style.infoWrapper}>
                <div className = {style.aboutUsWrapper}>
                   <NavLink to = '/aboutUs' className = {style.aboutUs}>{'Մեր մասին'}</NavLink>
                </div>
                <div className = {style.author}><span>{'Հեղինակ՝ '}</span>{'Մանուկյան Կարեն'}</div>
                <div className = {style.mail}><span>{'Էլ․հասցե՝ '}</span>{'arm.karen.manukyan88@gamil.com'}</div>
                <div className = {style.phone}><span>{'Հեռ․ '}</span>{'+374-41-099-022'}</div>
            </div>
            <div className = {style.copyrightIconWrapper}>
              <FaRegCopyright className = {style.copyright} />
              <span className = {style.copyrightText}>
                  {`COPYRIGHT 2021 SPORT STYLE. ALL RIGHTS RESERVED.`}
              </span>
            </div>
        </div>
    )
})

export default Footer;