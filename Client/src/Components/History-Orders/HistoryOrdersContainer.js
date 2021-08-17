import React, { useEffect, useState } from 'react';
import style from './HistoryOrders.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { VscSignOut } from 'react-icons/vsc';
import { FcSearch } from 'react-icons/fc';
import { BsTrash } from 'react-icons/bs';
import HistoryOrders from './HistoryOrders';
import {
    getOrdersHistory, removeAllOrdersHistory, removeOneOrder,searchOrdersByDate,
    searchOrdersByPrice,onOrdersHistoryPageChanged, setPortionNumber,toggleIsLoadingHistory,
    changePagesOfSearchOrdersByPrice,setOrdersTotalCount,changePagesOfSearchOrdersByDate,
    setSearchByDateTotalCount,setSearchByPriceTotalCount
} from '../../Redux/reducer/OrdersHistory-reducer';
import Pagination from '../common/Pagination/Pagination';
import logo from '../../Assets/Images/logo.png'
import removeSound from '../../Assets/audio/button4.mp3';
import soundClickEffect from '../../Assets/audio/button.mp3';
import MyCalendar from '../common/Calendar/Calendar';
import SearchByPrice from '../common/SearchByPrice/SearchByPrice';
import ShowModalDefault from './../common/ShowModalDefault/ShowModalDefault';
import Lodading from './../common/Loading/Loading';


const HistoryOrdersContainer = React.memo((props) => {

    const {currentPage,pageSize,totalOrdersCount,searchByPirceTotalCount,searchByDateTotalCount} = props
    const [toggle, setToggle] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [showAmountOfMoney, setShowAmountOfMoney] = useState(false)
    
    useEffect(() => {
        props.getOrdersHistory(props.currentPage, props.pageSize)  
         return () => {
                  props.toggleIsLoadingHistory(true)
                }
    }, [])

    const playRemoveSound = () => {
        const soundRemove = new Audio(removeSound)
              soundRemove.volume = 0.3
              soundRemove.play()
       }
    const playSound = () => {
    const sound = new Audio(soundClickEffect)
            sound.volume = 0.3
            sound.play()
    }

    if (toggle) {
        return <Redirect to='/home' />
    }
    if (!props.isAuth) {
        return <Redirect to='/auth/login' />
    }
    if (props.isLoading ) {
        return <Lodading />
    }


    const onPageChanged = (p) => {
        props.onOrdersHistoryPageChanged(p, props.pageSize);
    }

    const changePagesOfSearchOrdersByPrice = (p) => {
        props.changePagesOfSearchOrdersByPrice(p, props.pageSize,props.searchOrdersPrice);
    }

    const changePagesOfSearchOrdersByDate = (p) => {
        props.changePagesOfSearchOrdersByDate(p, props.pageSize,props.searchOrdersDate);
    }

    const removeAllOrdersHistory = () => {
        playRemoveSound()
        props.removeAllOrdersHistory()
    }

    const toggleContainerShow = () => {
        playSound()
        setToggle(true)
    }

    const changeShowCalendar = () => {
        setShowCalendar(showCalendar => !showCalendar)
    }
    const changeShowAmountOfMoney = () => {
        setShowAmountOfMoney(showAmountOfMoney => !showAmountOfMoney)
    }
    

return (
      <div className = {style.container}>
       {props.orders.length === 0 || 
         <div className={style.wrapper}>

                  <div className={style.paragraphWrapper}>
                     <img src = {logo} alt = 'logo' className = {style.logo}/>
                     <h3 className={style.paragraph}>{'Ձեր գնումների պատմությունը'}</h3>
                     <span className={style.close} onClick={toggleContainerShow} > {<VscSignOut />} </span>
                  </div>

          
                <div className={style.removeButtonWrapper} >
                    <button className={style.removeAllOrder} onClick={removeAllOrdersHistory} >
                       {'Մաքրել Պատմությունը'}
                     </button>
                </div>
            

                      <div className={style.infoContainer}>
                             <div className={style.numberInfo}>{'N'}</div>
                             <div className={style.dateInfo}>{'Ամսաթիվ'}
                               <span onClick = {changeShowCalendar}><FcSearch /></span>
                             </div>
                             <div className={style.timeInfo}>{'Ժամ'}</div>
                             <div className={style.moneyInfo}>{'Գումար'}
                               <span onClick = {changeShowAmountOfMoney}><FcSearch /></span>
                             </div>
                             <div className={style.removeOrder}>{<BsTrash />}</div>
                     </div>
            
                 
                     <ShowModalDefault changeShowModalActive={changeShowCalendar} showModalActive={showCalendar}>
                        <MyCalendar  searchOrdersByDate = {props.searchOrdersByDate}
                                     currentPage ={ props.currentPage} 
                                     pageSize ={ props.pageSize }
                                     changeShowModalActive={changeShowCalendar}
                                     setOrdersTotalCount = {props.setOrdersTotalCount}
                                     setSearchByPriceTotalCount = {props.setSearchByPriceTotalCount}
                        />
                     </ShowModalDefault>
                    
               
                     <ShowModalDefault changeShowModalActive={changeShowAmountOfMoney} showModalActive={showAmountOfMoney}>
                       <SearchByPrice changeShowModalActive={changeShowAmountOfMoney}
                                               currentPage ={ props.currentPage} 
                                               pageSize ={ props.pageSize }
                                               showAmountOfMoney = {showAmountOfMoney}
                                               searchOrdersByPrice = {props.searchOrdersByPrice}
                                               setOrdersTotalCount = {props.setOrdersTotalCount}
                                               setSearchByDateTotalCount = {props.setSearchByDateTotalCount}
                                               
                       />
                     </ShowModalDefault>
                     
                  

            <div className={style.orderContainer}>
        
               {props.orders.map((order) => {
                  return <div key={order._id} className = {style.histortOrdersContainer} >
                             <HistoryOrders order={order}
                                            removeOneOrder={props.removeOneOrder}
                                            currentPage={currentPage}
                                            pageSize={pageSize}
                               />
                          </div>
                })}

            </div>
             {(totalOrdersCount || searchByPirceTotalCount || searchByDateTotalCount) > 5 &&
                <Pagination
                    totalProductsCount={totalOrdersCount || searchByPirceTotalCount || searchByDateTotalCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage || 1}
                    portionNumber={props.portionNumber}
                    onPageChanged={(totalOrdersCount && onPageChanged)||
                                   (searchByPirceTotalCount && changePagesOfSearchOrdersByPrice)||
                                   (searchByDateTotalCount && changePagesOfSearchOrdersByDate)
                                  }
                    setPortionNumber={props.setPortionNumber}
                />
            }
        </div>
        }
        
        {props.orders.length === 0 &&
                <div className={style.enptyContainerWrapper}>
                    <div className={style.enptyContainer}>
                        <img src = {logo} alt = 'logo' className = {style.enptyContainerLogo}/>
                        <h3 className={style.paragraph}>{'Գնումների պատմություն'}</h3>
                        <p className={style.textInfo}>{props.message ||'Ձեր գնումների պատմությունը դատարկ է'}</p>
                    </div>
                </div>}

        </div>
   
    )
})

const mapStateToProps = (state) => {
    return ({
        isAuth: state.auth.isAuth,
        orders: state.historyPage.orders,
        currentPage: state.historyPage.currentPage,
        pageSize: state.historyPage.pageSize,
        isLoading: state.historyPage.isLoading,
        totalOrdersCount: state.historyPage.totalOrdersCount,
        searchByPirceTotalCount : state.historyPage.searchByPirceTotalCount,
        searchOrdersPrice : state.historyPage.searchOrdersPrice,
        searchByDateTotalCount : state.historyPage.searchByDateTotalCount,
        searchOrdersDate : state.historyPage.searchOrdersDate,
        portionNumber: state.historyPage.portionNumber,
        message : state.historyPage.message

    })
}

export default connect(mapStateToProps, { getOrdersHistory, removeAllOrdersHistory, setPortionNumber,
                                          changePagesOfSearchOrdersByPrice,setOrdersTotalCount,
                                          removeOneOrder, onOrdersHistoryPageChanged,toggleIsLoadingHistory,
                                          searchOrdersByDate,searchOrdersByPrice,changePagesOfSearchOrdersByDate,
                                          setSearchByDateTotalCount,setSearchByPriceTotalCount
                                        })(HistoryOrdersContainer)


