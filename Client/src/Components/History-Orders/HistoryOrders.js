import React from 'react';
import style from './HistoryOrders.module.css';
import ShowModal from '../common/ShowModal/ShowModal';
import { BsTrash } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import removeSound from '../../Assets/audio/button4.mp3';
import soundClickEffect from '../../Assets/audio/button.mp3';

const HistoryOrders = React.memo(({ order,currentPage,pageSize,removeOneOrder }) => {

    const [showModalActive, setShowModal] = React.useState(false)
                    
    let orderDate = new Date(order.date)
    let dd = orderDate.getDate();
    let mm = orderDate.getMonth() + 1; // January is 0!
    let yyyy = orderDate.getFullYear();          
    if (dd < 10) {
        dd = '0' + dd
    }      
    if (mm < 10) {
        mm = '0' + mm
    }
    let date = ( dd + ' / ' + mm + ' / ' + yyyy )

    let hours = orderDate.getHours()
    let minutes = orderDate.getMinutes()
    let seconds = orderDate.getSeconds()
    if (hours < 10) {
        hours = '0' + hours
    }      
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    let time =  hours + ' : ' + minutes + ' : ' + seconds 
    
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

    const removeOneOrderFromHistory = (e) => {
        playRemoveSound()
        e.stopPropagation()
        removeOneOrder(order._id, currentPage, pageSize)
    }

    const changeShowModalActive = () => {
        playSound()
        setShowModal(showModalActive =>!showModalActive)
    }

    return (
        <>
            <div className={style.historyOrdersWrapper}  onClick={changeShowModalActive}>
            
                    <div className={style.number}>{order.orderNumber}</div>
                    <div className={style.date}>{date}</div>
                    <div className={style.time}>{time}</div>
                    <div className={style.money}>{`${order.money} դրամ`}</div>
            
                <div className={style.remove} >
                    <span onClick={removeOneOrderFromHistory}>{<BsTrash />}</span>
                </div>
            </div>
    
            <ShowModal changeShowModalActive={changeShowModalActive} showModalActive={showModalActive} >
                <History changeShowModalActive={changeShowModalActive} order={order} />
            </ShowModal>
        </>
    )
})


export default HistoryOrders;


const History = React.memo(({ changeShowModalActive, order }) => {

let num = 1
 
    return (
        
            <div className={style.historyWrapper}>
                <div className={style.closeModal} onClick={changeShowModalActive}>{<VscSignOut />}</div>
                <div className = {style.orderNumberWrapper}>
                  <p className = {style.orderNumber}>{'Պատվեր'}
                   <AiOutlineFieldNumber className = {style.fieldNumber}/>
                   {order.orderNumber}</p>
                </div>
                <div  className = {style.historyBodyInfoContainer}>
                    <div className = {style.historyBodyInfoWrapper}>
                        <span><AiOutlineFieldNumber/></span>
                        <span> {'Անուն'}</span>
                        <span> {'Նկարը'}</span>
                        <span> {'Չափս'}</span>
                        <span> {'Քանակը'}</span>
                        <span>{'Գումարը'}</span>
                    </div>
                </div>
          
                <div className = {style.historyBodyWrapper}>      
                { order.order.map((order) => {
                     order.num = num++
                        return <div key={order.id} className={style.historyBody}>
                            <span>{order.num}</span>
                            <span> {order.name}</span>
                            <span><img src = {order.photo} alt = 'orderPhoto'/></span>
                            <span> {order.size}</span>
                            <span> {order.quantity}</span>
                            <span>{order.price * order.quantity + ' դր․'}</span>
                        </div>
                    })
                }
               </div>
            </div>
    )
})




