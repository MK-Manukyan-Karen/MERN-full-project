import React from 'react';
import SingUp from './SingUp';
import { connect } from 'react-redux';
import {Register} from '../../../Redux/reducer/Auth-reducer'; 
import Lodading from './../../common/Loading/Loading';
import { Redirect } from 'react-router-dom';




class SingUpContainer extends React.PureComponent {

  render(){
  
    if (this.props.isLoading) {
      return <Lodading />
    }
    if(this.props.isAuth){
     return  <Redirect to = {'/home'} />
    }
    
      return  <SingUp  {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return ({
    isAuth : state.auth.isAuth,
    isLoading: state.auth.isLoading,
    userName: state.auth.registerData.userName,
    email: state.auth.registerData.email,
    password: state.auth.registerData.password,
  })
}


export default connect(mapStateToProps,{Register})(SingUpContainer)