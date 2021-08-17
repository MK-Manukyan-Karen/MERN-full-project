import React from 'react';
import style from './TextareaFormControls.module.css';
import errorPhoto from './../../../assets/images/errorPhoto.png';


export const Textarea = ({input,meta,...props}) => {

    const hasError = meta.error && meta.touched;
 
    return (
        <div className = {style.formControls}>
            <div className = {style.textareaWrapper}>
               {hasError  && 
                 <img src = {errorPhoto} className = { style.photoError} alt = 'errorPhoto'/> 
               }
                 <textarea {...input} {...props} className = { hasError  ? style.error : style.noError }
                                                 placeholder = {props.placeholder} / > 
            </div>

            { hasError  &&
            <div className = {style.errorMassageWrapper} >
                    <span className = {style.errorMassage}  >{meta.error}</span>
            </div>
            }
        </div>
    )
};














