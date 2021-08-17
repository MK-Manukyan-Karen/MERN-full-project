import React from 'react';
import style from './InputFormControls.module.css';


    
export const Input = ({input,meta,...props}) => {

  const hasError = meta.error  && meta.touched 
  const metaError = meta.invalid && meta.dirty


  return (
      <div className = {style.formControls}>
          <div className = {style.inputWrapper}>
            { (metaError || hasError ) &&  <div className = {style.invalid}></div>}
             {meta.valid && <div className = {style.valid}></div>}
             {props.error && <div className = {style.propsError}></div>}
               <input {...input} {...props} 
               className = { hasError || props.error || metaError ? style.error : style.ifInput } / > 
          </div>

          {(hasError || metaError) &&
          <div className = {style.errorMassageWrapper}>
                  <span className = {style.errorMassage}  >{meta.error}</span>
          </div>
          }
      </div>
  )
};














