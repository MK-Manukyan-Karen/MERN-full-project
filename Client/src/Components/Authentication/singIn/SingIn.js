import React, { useState } from 'react';
import style from './SingIn.module.css';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Input } from '../../common/FormsControls/InputFormControls';
import { required, maxLength, minLength, email } from '../../../Utils/validators/Validators';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../../Assets/Images/logo.png';

const requiredLogin = required('Խնդրոմ ենք գրել Ձեր email-ը');
const requiredPassword = required('Խնդրոմ ենք գրել Ձեր գաղտնաբառը');
const maxLength40 = maxLength(40);
const minLength8 = minLength(8);
const maxLength16 = maxLength(16);

const Login = React.memo ( (props) => {

  const [toggle, setToggle] = useState(false)
  const closeLogin = () => setToggle(!toggle)

  if (toggle) {
    return <Redirect to={'/home'} />
  }

    return  (

    <div className = {style.loginFormContainer}>
        <div className = {style.square} style = {{'--i':0}}>
            <img src = {logo} alt = 'logo'/>
        </div>
        <div className = {style.square} style = {{'--i':1}}>
           <img src = {logo} alt = 'logo'/>
        </div>
        <div className = {style.square} style = {{'--i':2}}>
           <img src = {logo} alt = 'logo'/>
        </div>
        <div className = {style.square} style = {{'--i':3}}>
           <img src = {logo} alt = 'logo'/>
        </div>
        <div className = {style.square} style = {{'--i':4}}>
           <img src = {logo} alt = 'logo'/>
        </div>
        
        <form className={style.loginForm} onSubmit={props.handleSubmit}>
        
            <span className = {style.closeLogin} onClick = {closeLogin}><AiOutlineClose /></span> 
            <div className={style.loginParagraph}>
                <h3>{'Մուտք'}</h3>
            </div>

            <div className={style.inputWrapper}>
                <Field id={style.email}
                       component={Input}
                       validate={[requiredLogin, maxLength40, email]}
                       placeholder={'Ձեր email-ը'}
                       type={'text'} name={'email'} />
            </div>

            <div className={style.inputWrapper}>
                <Field id={style.password}
                       component={Input}
                       validate={[requiredPassword, minLength8,maxLength16]}
                       placeholder={'Ձեր գաղտնաբառը'}
                       type={'password'}
                       name={'password'} />
            </div>
              
                <Field type={"checkbox"}
                       id={'rememberMe'}
                       component={'input'}
                       name={'rememberMe'}
                       className={style.login} />
                
             
                <Field htmlFor={"rememberMe"}
                       className={style.label}
                       name={'rememberMe'}
                       component={'label'}>
                 <span className={style.ui}></span>
                 <span className = {style}>{'Հիշել'}</span>
                </Field>
          
           <div className={style.buttonWrapper}>
            <button className={style.button} disabled = {props.isLoading}>
              {'Մուտք գործել'}
            </button>
            <span></span>
            <span></span>
          </div>
          {props.error &&
                <div className = {style.errorMassageWrapper}>
                  <p className = {style.errorMassage}>{props.error}</p>
                </div>
            }
        </form>
    </div>
    )
})

const SingIn = React.memo ( (props) => {
    const onSubmit = (authDate) => {
        props.Login(authDate);
    }

    if (props.isAuth) {
        return <Redirect to={'/home'} />
    }

    return (
        <div className={style.singInContainer}>
            <LoginFormRedux onSubmit={onSubmit} 
                           initialValues={{ 
                                email : props.email,
                                password: props.password
                              }}
            />
        </div>
    )
})

const LoginFormRedux = reduxForm({ form: 'Login' })(Login);

export default SingIn;