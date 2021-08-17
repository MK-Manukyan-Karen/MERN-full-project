import React from 'react';
import SingIn from './SingIn';
import { connect } from 'react-redux';
import { Login } from './../../../Redux/reducer/Auth-reducer';
import Lodading from './../../common/Loading/Loading';


class SingInContainer extends React.PureComponent {

  render() {
    if (this.props.isLoading) {
      return <Lodading />
    }
    return <SingIn {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    email: state.auth.loginData.email,
    password : state.auth.loginData.password
  })
}


export default connect(mapStateToProps, { Login })(SingInContainer)