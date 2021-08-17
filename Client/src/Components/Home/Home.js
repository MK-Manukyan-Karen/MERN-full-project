import React from 'react';
import style from './Home.module.css';
import Typing from 'react-typing-animation';
import { NavLink } from 'react-router-dom';



const Home = React.memo((props) => {

    return (
        
        <div className = {style.wrapper}>

             <div className = {style.paragraphWrapper}>
                 <div className = {style.paragraph}>
                   <span className = {style.text1}> Բարի գալուստ SPORT STYLE SHOP</span>
                   <span className = {style.text2}> Բարի գալուստ SPORT STYLE SHOP</span>
                   <span className = {style.text3}> Բարի գալուստ SPORT STYLE SHOP</span>
                 </div>
                 <div className={style.textWrapper}>
          
                   <p className = {style.text}>{`Մեր կայքը ստեղծվել է 2021 թվականից և  զբղվում է սպորտային կոշիկների  վաճառքով:
                   Sport Style Shop - ում բազմաթիվ տեսականու մեջ՝ Դուք կարող եք գտնել Ձեր ճաշակին համապատասխան սպորտային կոշիկներ,որոնք
                   իրենց բարձր որակով հայտնի են ամբողջ աշխարհում : 
                   Մենք առաջարկում ենք մեր գնորդներին բարձրորակ ապրանք,հարաբերական ցածր գին ինչպես նաև մեծածախ գնումների դեպքում համապատասխան մեծ զեղջեր:`}
                  </p>
              
                  <Typing speed = {1} >
                    <p className={style.info}>
                      Գրանցվելով {!props.isAuth 
                                   ? <NavLink to='/auth/register' className={style.link}> մեր կայքում, </NavLink>
                                   : ' մեր կայքում, '
                                  }
                       դառնալով մեր հաճախորդը,Դուք կարող եք ձեռք բերել Sport Style Shop կայքում առկա ամբողջ տեսականին
                      <i className={style.discount}> 10% զեղչով: </i>
                    </p>
                 </Typing>              
                </div>

           
             </div>
        </div>
       
    )
})


export default Home