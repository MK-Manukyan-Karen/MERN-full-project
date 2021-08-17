import React from 'react';
import style from './AboutUs.module.css';
import {NavLink} from 'react-router-dom';
import productPhoto1 from '../../Assets/Images/AirMax1.png';
import productPhoto2 from '../../Assets/Images/AirMax2.png';
import productPhoto3 from '../../Assets/Images/AirMax3.png';



const AboutUs = React.memo( (props) => {

    return (
        <div className = {style.container}>
 
         
            <div className = {style.contentBody}>
             <div className = {style.paragraph}>
                    <h3>{'Մեր Մասին'}</h3>
             </div>
                <div className = {style.box}>
                  <span className = {style.logoText}>SportStyle</span>
                  <span className = {style.photo1}><img src = {productPhoto1} alt = 'photoProduct'/></span>
                  <span className = {style.photo2}><img src = {productPhoto2} alt = 'photoProduct'/></span>
                  <span className = {style.photo3}><img src = {productPhoto3} alt = 'photoProduct'/></span>
                  <span className = {style.photo4}><img src = {productPhoto1} alt = 'photoProduct'/></span>
                  <span className = {style.photo5}><img src = {productPhoto2} alt = 'photoProduct'/></span>
                  <span className = {style.photo6}><img src = {productPhoto3} alt = 'photoProduct'/></span>
                  <span className = {style.photo7}><img src = {productPhoto1} alt = 'photoProduct'/></span>
                  <span className = {style.photo8}><img src = {productPhoto2} alt = 'photoProduct'/></span>
                </div>

                <div className = {style.textWrapper}>
                    <p className = {style.text}>{`Մեր կայքը ստեղծվել է 2021 թվականից և  զբղվում է << սպորտային կոշիկների >> վաճառքով:
                   Sport Style Shop - ում բազմաթիվ տեսականու մեջ՝ Դուք կարող եք գտնել Ձեր ճաշակին համապատասխան սպորտային կոշիկներ,որոնք
                   իրենց բարձր որակով հայտնի են ամբողջ աշխարհում : 
                   Մենք առաջարկում ենք մեր գնորդներին բարձրորակ ապրանք,հարաբերական ցածր գին ինչպես նաև մեծածախ գնումների դեպքում համապատասխան մեծ զեղջեր:`}</p>
                    <p className={style.textLink}>Գրանցվելով<NavLink to='/auth/register' className={style.linkRegister}> մեր կայքում, </NavLink>
                                                դառնալով մեր հաճախորդը,Դուք կարող եք ձեռք բերել Sport Style Shop կայքում առկա ամբողջ տեսականին
                                                <i className={style.discount}> 10% զեղչով: </i>
                    </p>
                </div>

                <div className = {style.linkWrapper}>
                    <NavLink className = {style.link} to = '/products'>
                          {'Մեր ապրանքները'}
                    </NavLink>
                </div>
              
            </div>
        </div>
    )
})

export default AboutUs