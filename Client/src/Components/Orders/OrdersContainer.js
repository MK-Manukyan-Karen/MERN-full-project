import React, { useState } from 'react';
import style from './Orders.module.css'
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Orders from './Orders';
import ShowModal from '../common/ShowModal/ShowModal';
import {
    updateQuantity, updateTotalQuantityPrice,
    removeOrder, removeAllOrder, buyOrder, updateSize,
} from '../../Redux/reducer/Order-reducer';
import Loading from './../common/Loading/Loading';




const OrdersContiner = React.memo((props) => {

    let [showModalActive, setShowModalActive] = useState(false)
    let [isOwner, setOwner] = useState(true)

  
    React.useEffect(() => {
        sessionStorage.setItem('orders',JSON.stringify(props.orders))
    },[props.orders])



    let totalPriceArr = [];
    props.orders.map((order) => {
        return totalPriceArr.push(order.price * order.quantity)
    })
    let totalPrice = totalPriceArr.reduce((prev, price) => {
        return prev + price
    }, 0)

    let totalQuantityArr = [];
    props.orders.map((order) => {
        return totalQuantityArr.push(order.quantity)
    })
    let totalQuantity = totalQuantityArr.reduce((prev, quantity) => {
        return prev + quantity
    }, 0)


  
    const changeShowModalActive = () => {
        setShowModalActive(!showModalActive)
    }

   
    const setNewOrder = () => {
               if(props.isAuth){
                    props.buyOrder(props.orders, totalPrice)
                    setTimeout(() => {
                            changeShowModalActive()
                    },500);
               }else{
                  setOwner(false)
               }
              
    }

    if (!isOwner){
        return <Redirect to='/auth/login' />
    }

    if (props.isLoading) {
        return <Loading />
    }

    return (
        <>
            
            <ShowModal changeShowModalActive={changeShowModalActive}
                       showModalActive={showModalActive} isAuth = {props.isAuth}>
                   
                <div className={style.continueWrapper}>
                    <span className={style.continue}  > {props.message} </span>
                    {
                      props.isAuth 
                      ? <span className={style.continue}  >
                         {'Մեր աշխատակիցը շուտով կկապնվի Ձեզ հետ'}
                        </span>
                      : <>
                           <span className={style.continue}  >
                             {'Պատվերի համար խնդրեում ենք կատարել Մուտք'}
                           </span>
                           <NavLink  to='/auth/login' className={style.linkContinue}>{'ՄՈՒՏՔ'}</NavLink>
                        </>
                    }
                   
                   {props.isAuth && <span className={style.linkContinue} onClick={changeShowModalActive}>
                        {'Շարունակել'}
                    </span>
                   }
                </div>
            </ShowModal>

               <Orders  orders = {props.orders}
                        setNewOrder={setNewOrder}
                        totalQuantity={totalQuantity}
                        totalPrice={totalPrice}
                        removeAllOrder={props.removeAllOrder}
                        buyOrder = {props.buyOrder}
                        isLoading = {props.isLoading}
                        message = {props.message}
                        removeOrder = {props.removeOrder}
                        updateQuantity = {props.updateQuantity}
                        updateSize ={props.updateSize}
                        updateTotalQuantityPrice = {props.updateTotalQuantityPrice}

                    
            />
        </>
    )
})

const mapStateToProps = (state) => {
    return ({
        orders: state.ordersPage.orders,
        message: state.ordersPage.message,
        isAuth: state.auth.isAuth,
        isLoading: state.ordersPage.isLoading
    })
}

export default connect(mapStateToProps, {
    updateQuantity, updateTotalQuantityPrice,
    removeOrder, removeAllOrder, buyOrder, updateSize,
})(OrdersContiner)




