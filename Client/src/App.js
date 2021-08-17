import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './Redux/reducer/App-Reducer';
import Header from './Components/Header/Header';
import HomeContainer from './Components/Home/HomeContainer';
import Footer from './Components/Footer/Footer';
import { withSuspense } from './Components/common/HOC/withSuspense';
import Loading from './Components/common/Loading/Loading';
import ProductsContainer from './Components/Products/ProductsContainer'
const OrdersContainer = React.lazy(() => import('./Components/Orders/OrdersContainer'));
const SingInContainer = React.lazy(() => import('./Components/Authentication/singIn/SingInContainer'));
const SingUpContainer = React.lazy(() => import('./Components/Authentication/singinUp/SingUpContainer'));
const MyProfileContainer = React.lazy(() => import('./Components/Header/ProfileData/MyProfileReduxFormData/MyProfileContainer'));
const HistoryOrdersContainer = React.lazy(() => import('./Components/History-Orders/HistoryOrdersContainer'));
const AboutUs = React.lazy(() => import('./Components/AboutUs/AboutUs'));
const ContactUs = React.lazy(() => import('./Components/ContactUs/ContactUs'));



class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
 
    if (!this.props.initialized) {
      return  <Loading />
    }
    return (
      <div className="App-continer">
        <Header />

        <Route exact path={['/', '/home']}  render={() => <HomeContainer />} />
        <Route exact path='/products' render={() => <ProductsContainer />} />
        <Route exact path='/orders' render={withSuspense(OrdersContainer)} />
        <Route exact path='/auth/login' render={withSuspense(SingInContainer)} />
        <Route exact path='/auth/register' render={withSuspense(SingUpContainer)} />
        <Route exact path='/myProfile/edit' render={withSuspense(MyProfileContainer)} />
        <Route exact path='/orders/history' render={withSuspense(HistoryOrdersContainer)} />
        <Route exact path='/aboutUs' render={withSuspense(AboutUs)} />
        <Route exact path='/contact' render={withSuspense(ContactUs)} />

        <Footer />
      </div>
    );
  }

}

const mapStatetoProps = (state) => {
  return ({
    initialized: state.app.initialized
  })
}

export default compose(
  connect(mapStatetoProps, { initializeApp }))(App);


