import React from 'react';
import style from './SearchByPrice.module.css';
import { reduxForm, Field } from 'redux-form';
import InputAnimation from '../InputAnimation/InputAnimation';
import NeonAnimationButton from '../../Buttons/NeonAnimationButton/NeonAnimationButton';
import { required} from '../../../Utils/validators/Validators';


const requiredPrice = required('Խնդրոմ ենք գրել գումարի չափը');


const SearchForm = (props) => {
    return (
        <form className = {style.form} onSubmit={props.handleSubmit}>
           <h3 className = {style.amountOfMoneyParagraph}>{'Նշել գումարի չափը'}</h3>
           <Field id={'start'}
                  component={InputAnimation}
                  validate={[requiredPrice]}
                  type={'number'} name={'start'} 
                  label = {'Մինիմում'}
         

            />

            <Field id={'end'}
                   component={InputAnimation}
                   validate={[requiredPrice]}
                   type={'number'} name={'end'} 
                   label = {'Մաքսիմում'}
    
                />
       
           <NeonAnimationButton name = {'Փնտրել'} 
                                margin = '0px'
                                marginTop = '40px'  
                                width = '40%'
                                height = '40px'
                                fontSize = '16px' 
           />
        </form>
    )
}


const SearchByPrice = React.memo( (props) => {

    const onSubmit = (searchDataPrice) => {
        props.setOrdersTotalCount(null)
        props.setSearchByDateTotalCount(null)
        props.changeShowModalActive()
        props.searchOrdersByPrice(props.currentPage,props.pageSize,searchDataPrice);
       
       
    }

    return (
        <div className={style.singInContainer}>
            <FormRedux onSubmit={onSubmit}
                                // initialValues={{ userName: props.userName,
                                //                 email : props.email,
                                //                 password: props.password
                                //               }}
                                              
            />
        </div>
    )
})

const FormRedux = reduxForm({ form: 'searchByPrice' })(SearchForm);



export default SearchByPrice