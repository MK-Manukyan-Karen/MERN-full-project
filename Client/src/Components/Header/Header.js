import React,{useState} from 'react';
import style from './Header.module.css';
import { withRouter } from 'react-router-dom';
import Logo from './Logo/Logo';
import MenuItems from './MenuItems/MenuItems';
import Button from './Button/Button';
import LogoBars from './LogoBars/LogoBars';
import Basket from './Basket/Basket';
import { connect } from 'react-redux';
import ProfileData from './ProfileData/ProfileData';
import {logOut} from '../../Redux/reducer/Auth-reducer'
import { SidebarData } from './SidebarData';
import { isOwnerSideBarData } from './isOwnerSideBarData';


const Header = React.memo ( (props) => {

    const[sidebar, setSidebar] = useState(false)
   
    return (

        <header className={style.headerContainer}>
            <nav className={style.navbarItems}>
                <Logo toggleSideBar={setSidebar} />
                
                <MenuItems sidebar={sidebar}  toggleSideBar={setSidebar}
                           sideBarData = {props.isAuth ? isOwnerSideBarData : SidebarData}
                />
                <Basket quantityProduct = {props.orders.length}
                        toggleSideBar={setSidebar}
                />

                {props.isAuth 
                    ? <ProfileData userName = {props.userName}
                                   userPhoto = {props.userPhoto}
                                   isAuth = {props.isAuth}
                                   toggleSideBar={setSidebar}
                                   logOut = {props.logOut}/>
                    : <Button toggleSideBar={setSidebar} /> 
                }
              
                <LogoBars toggleSideBar={setSidebar} sidebar={sidebar} />
            </nav>
            <span className = {style.borderShadow}></span>
        </header>
    );

})

const mapStateToProps = (state) => {
    return ({
            orders : state.ordersPage.orders,
            isAuth : state.auth.isAuth,
            userName : state.auth.userName,
            userPhoto : state.auth.userPhoto
          })
}


export default connect(mapStateToProps,{logOut})(withRouter( Header) )

