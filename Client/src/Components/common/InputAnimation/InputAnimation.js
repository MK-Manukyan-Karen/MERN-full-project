import React from 'react';
import style from './InputAnimation.module.css';

const InputAnimation = ({input,meta,...props}) => {

    const hasError = meta.error  && meta.touched 
    const value = input.value
    
    return (
        <div className = {style.inputField}>
          <input {...input} {...props}
                 type="number" id= {props.id} className = { hasError ? style.inputError : style.input} 
          />
          <label htmlFor = {props.id} className = {hasError ? style.labelError : (value ? style.labelActive : style.label )}>
              {props.label} 
          </label>
          {value && <span className = {style.currency}>{'դրամ'}</span>}
          {hasError &&  <div className = {style.errorMassageWrapper}>
                           <span className = {style.errorMassage}  >{meta.error}</span>
                        </div>
         }
        </div>
    )
}

export default InputAnimation