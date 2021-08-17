import React from "react";
import style from './ButtonImpulseEffect.module.css';
import { FaPhoneAlt } from "react-icons/fa";

export const ButtonImpulseEffect = React.memo((props) => {
    return (

        <div className = {style.pulse}>
            <div className = {style.bloc}></div>
            <div className = {style.phone}>
                <FaPhoneAlt aria-hidden="true" className = {style.phoneIcon} />
            </div>
            <div className = {style.text}>
                {props.children}
            </div>
        </div>
    )
})
