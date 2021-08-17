import React from 'react';
import style from './ContactUs.module.css';
import logo from '../../Assets/Images/logo.png';
import { ButtonImpulseEffect } from '../Buttons/ButtonImpulseEffect/ButtonImpulseEffect';
import GlowingButtonHover from '../Buttons/GlowingButtonHover/GlowingButtonHover';
import { CasketHoverButton } from './../Buttons/CasketHoverButton/CasketHoverButton';


const ContactUs = React.memo ( (props) => {

    return (
        <div className={style.container}>
            <div className={style.paragraphWrapper}>
                <h3 className={style.paragraph} >{'Կապ Մեզ հետ'}</h3>
            </div>
            <div className={style.contentBody}>
                <div className={style.logoWrapper}>
                    <div className={style.logoBody}>
                        <img src={logo} className={style.logo} alt='logo' />
                    </div>
                    <div className={style.logoParagraphWrapper}>
                        <h3 className={style.logoParagraph} >{'Sport Style'}</h3>
                    </div>
                </div>
                <div className={style.infoWrapper}>
                      <h3 className={style.nameWrapper} >
                          {'Ծրագրավորող-Դիզայներ՝'} <span className = {style.name}>{'Մանուկյան Կարեն'}</span>
                      </h3>
                 
                      <div className={style.phoneWrapper}>
                        <ButtonImpulseEffect>041-099-022</ButtonImpulseEffect>
                      </div>
                      <div className={style.facebookWrapper}>
                          <GlowingButtonHover text = 'Facebook' link = 'https://www.facebook.com/karen.manukyan.5832343'/>
                      </div>
                      <div className={style.gitHubWrapper}>
                         <GlowingButtonHover text = 'GitHub' link = 'https://github.com/MK-Manukyan-Karen'/>
                      </div>
                      <div className={style.gamilWrapper}>
                          <CasketHoverButton text = 'arm.karen.manukyan88@gmail.com'/>
                      </div>
                </div>
    
            </div>


        </div>
    )
})



export default ContactUs