import React from 'react';
import style from './MyProfile.module.css';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import {ButtonHoverGradients} from '../../../Buttons/ButtonHoverGradients/ButtonHoverGradients';
import {Input} from '../../../common/FormsControls/InputFormControls';
import { required, minLength,maxLength} from '../../../../Utils/validators/Validators';

const minLength4 = minLength(4);
const maxLength10 = maxLength(10);
const requiredRegisterName = required('Խնդրոմ ենք լրացնել Ձեր անունը');
const ProfileFormData = React.memo ( (props) => {

    const { handleSubmit } = props


    return (
        <>
            { !props.editMode &&
                <form onSubmit={handleSubmit} className={style.loginForm}>
                    <div className={style.formParagraph}>
                        <h3 className={style.paragraph}>{'Փոխել Ձեր անունը'}</h3>
                    </div>

                    <div className={style.editDataWrapper}>
                        <Field component={Input}
                               placeholder='Ձեր անունը'
                               name={'userName'}
                               type='text'
                               maxLength="11" 
                               validate = {[minLength4,requiredRegisterName,maxLength10]}
                
                        />
                    </div>

                    <div className={style.userProfileParagraphWrapper}>
                        <h4 className={style.paragraph}>{'Փոխել Ձեր նկարը'}</h4>
                    </div>

                    <div className={style.imageWrapper}>
                        <img src={props.profileImage}
                            className={style.photo}
                            alt='userPhoto' />
                    </div>

                    <div className={style.choseFile}>
                        <input type='file'
                               onChange={props.onChangeProfilePhotos}
                               className={style.file}
                               name='userPhoto'
                               id='choseFile'
                               accept='image/*'
                        />

                        <label htmlFor='choseFile'>
                           <span className={style.photoLabel}> {'Ընտրել նկարը'}</span>
                        </label>
                    </div>

                    <div className={style.formButtonWrapper}>
                       <ButtonHoverGradients name = 'Պահպանել' />
                    </div>

                </form>
            }
            { props.editMode && <Redirect to='/home' />}
        </>
    );

});


const MyProfileReduxFormData = reduxForm({ form: 'profileEdit' })(ProfileFormData);
export default MyProfileReduxFormData;






