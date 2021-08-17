import React, { useState,useEffect } from 'react';
import style from './SingUp.module.css';
import { reduxForm, Field } from 'redux-form';
import { NavLink, Redirect } from 'react-router-dom';
import { Input } from '../../common/FormsControls/InputFormControls';
import { required, maxLength, minLength, email } from '../../../Utils/validators/Validators';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../../Assets/Images/logo.png';
import ShowModal from '../../common/ShowModal/ShowModal'

const requiredRegisterName = required('Խնդրոմ ենք լրացնել Ձեր անունը');
const requiredRegister = required('Խնդրոմ ենք լրացնել Ձեր email');
const requiredPassword = required('Խնդրոմ ենք լրացնել Ձեր գաղտնաբառը');
const maxLength10 = maxLength(10);
const maxLength30 = maxLength(30);
const maxLength16 = maxLength(16);
const minLength8 = minLength(8);
const minLength4 = minLength(4);

const Register = React.memo( (props) => {
  let [showModalActive, setShowModalActive] = useState(false)
  const [toggle, setToggle] = useState(false)

  const changeShowModalActive = () => {
      setShowModalActive(showModalActive =>!showModalActive)
  }

  const closeRegister = () => setToggle(!toggle)


  const OK = props.error ===  'Շնորհակալություն Դուք հաջողությամբ գրանցվել եք'
                             ? 'Շնորհակալություն Դուք հաջողությամբ գրանցվել եք' : ''
  const Error = props.error === 'Այդպիսի email արդեն առկա է' 
                               ? 'Այդպիսի email արդեն առկա է' : ''

  useEffect(()=>{
  if(props.error === OK){
    changeShowModalActive()
  }
},[OK,props.error])
 

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

             <ShowModal changeShowModalActive={changeShowModalActive}
                             showModalActive={showModalActive}>
                    <div className = {style.showModalContainer}>
                          <p className = {style.showModalInfo}>{OK}</p>
                          <NavLink to = '/auth/login' className = {style.showModalLink}>
                           {'Շարունակել'}
                          </NavLink>
                    </div>
             </ShowModal>

        <form className={style.loginForm} onSubmit={props.handleSubmit}>
        
            <span className = {style.closeRegister} onClick = {closeRegister}><AiOutlineClose /></span> 
            <div className={style.loginParagraph}>
                <h3>{'Գրանցում'}</h3>
            </div>

            <div className={style.inputWrapper}>
                <Field id={'userName'}
                       component={Input}
                       validate={[requiredRegisterName,minLength4,maxLength10]}
                       placeholder={'Ձեր Անունը '}
                       type={'text'} name={'userName'} 
                />
            </div>

            <div className={style.inputWrapper}>
                <Field id={'email'}
                       component={Input}
                       validate={[requiredRegister, maxLength30, email]}
                       placeholder={'Ձեր email '}
                       type={'text'} name={'email'} 
                       error = {Error}
            
                />
               {props.error === Error &&
                <div className = {style.errorMassageWrapper}>
                  <p className = {style.errorMassage}>{props.error}</p>
                </div>
               }
              
             
            </div>

            <div className={style.inputWrapper}>
                <Field id={'password'}
                       component={Input}
                       validate={[requiredPassword, minLength8,maxLength16]}
                       placeholder={'Ձեր գաղտնաբառը'}
                       type={'password'}
                       name={'password'}
                 />
            </div>

              <div className={style.buttonWrapper}>
                <button className={style.button} disabled = {props.isLoading} >
               {'Գրանցվել'}
                </button>
                <span></span>
                <span></span>
          </div>
        </form>
  
    </div>
    )
})

const SingUp = React.memo( (props) => {

    const onSubmit = ({userName,email,password}) => {
         props.Register(userName,email, password);
    }

    return (
        <div className={style.singInContainer}>
            <RegisterFormRedux onSubmit={onSubmit}
                               initialValues={{ userName: props.userName,
                                                email : props.email,
                                                password: props.password
                                              }}
                                              
            />
        </div>
    )
})

const RegisterFormRedux = reduxForm({ form: 'Register' })(Register);

export default SingUp;


