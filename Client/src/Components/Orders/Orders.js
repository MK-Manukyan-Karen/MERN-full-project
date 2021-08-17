import React from 'react';
import style from './Orders.module.css';
import CounterOdometer from './Odometer/CounterOdometer';
import { FaShoppingCart } from 'react-icons/fa';
import Order from './Order.js/Order';
import { ButtonHoverGradients } from './../Buttons/ButtonHoverGradients/ButtonHoverGradients';
import removeSound from '../../Assets/audio/button4.mp3';


const Orders = React.memo((props) => {

    const playRemoveSound = () => {
     const soundRemove = new Audio(removeSound)
           soundRemove.volume = 0.3
           soundRemove.play()
    }
    const removeAllOrder = () => {
          props.removeAllOrder()
          playRemoveSound() 
    }

    return (
        <div className={style.container}>
            {props.orders.length === 0 ||
                <div className={style.fullContainer}>
                    <div className={style.cartWrapper}>
                        <FaShoppingCart className={style.cart} />
                        <h4 className={style.paragraph}>Ձեր Զամբյուղը</h4>
                    </div>

                    <div className={style.removeButtonWrapper} onClick={removeAllOrder}>
                        <button className={style.removeAllOrder}  >
                            {'Մաքրել Զամբյուղը'}
                        </button>
                    </div>
                    <div className={style.orderContainer}>
                        {props.orders.map((product) => {
                            return (
                                <div key = {product.id} className={style.wrapper}>

                                    <Order name={product.name}
                                        price={product.price}
                                        photo={product.photo}
                                        size={product.size}
                                        quantity={product.quantity}
                                        currency={product.currency}
                                        id={product.id}
                                        totalQuantityPrice={product.totalQuantityPrice}
                                        updateQuantity={props.updateQuantity}
                                        updateSize={props.updateSize}
                                        updateTotalQuantityPrice={props.updateTotalQuantityPrice}
                                        removeOrder={props.removeOrder}

                                    />
                                </div>
                            )
                        })
                        }

                    </div>
                    <div className={style.totalPriceContainer}>
                        <div className={style.totalPriceWrapper}>
                            <span className={style.productType}>{'Ապրանքի տեսակ`'}
                                <span className = {style.type}>{props.orders.length}</span>
                            </span>
                            <span className={style.totalQuantity}>{'Ընդհանուր քանակ`'}
                            <span className = {style.quantity}>{props.totalQuantity}</span>
                            </span>
                            <span className={style.totalPrice}>{'Ընդհանուր գումար`'}
                                <span className = {style.odometer}><CounterOdometer value = {props.totalPrice}/></span>
                                <span className = {style.currency}>{'դրամ'}</span>
                            </span>
                        </div>

                    </div>
                    <div className={style.buttonWrapper}>
                        <ButtonHoverGradients name='Պատվիրել' callback={ props.setNewOrder} />
                    </div>
                  

                </div>}

            {props.orders.length === 0 &&
                <div className={style.enptyContainerWrapper}>
                    <div className={style.enptyContainer}>
                        <div className={style.cartWrapper}>
                            <FaShoppingCart className={style.cart} />
                            <h4 className={style.paragraph}>Ձեր Զամբյուղը</h4>
                        </div>
                        <p className={style.textInfo}>{'Ձեր զամբյուղը դատարկ է'}</p>
                    </div>
                </div>}

        </div>
    )
})

export default Orders;









