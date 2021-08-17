import React from 'react';
import Home from './Home';
import { connect } from 'react-redux';


const HomeContainer = React.memo((props) => {

    return (
       <Home {...props}/>
    )
})
 const mapDispatchToProps = (state) => {
   return (
       {
         isAuth: state.auth.isAuth,
       }
   )
 }

export default connect(mapDispatchToProps,{})(HomeContainer) 