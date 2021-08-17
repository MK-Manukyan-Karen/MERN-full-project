import React, { useEffect, useState } from 'react';
import style from './Order.module.css';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import Size from '../../Products/ProductCard/Size/Size';
import sound from '../../../Assets/audio/button3.mp3';
import removeSound from '../../../Assets/audio/button4.mp3';


const Order = React.memo ( (props) => {

    let [quantity, setQuantity] = useState(props.quantity)
    let [sizeShoes, setSizeShoes] = React.useState(props.size)


    useEffect(() => {
        setQuantity(props.quantity)
    }, [props.quantity])

    const plusProductQuantity = () => {

        if (quantity < 99) {
            setQuantity(++quantity)
            props.updateQuantity(props.id, quantity)
            props.updateTotalQuantityPrice(props.id, quantity * props.price)
            playplusMinusSound()
        }

    }
    const minusProductQuantity = () => {
        if (quantity > 1) {
            setQuantity(--quantity)
            props.updateQuantity(props.id, quantity)
            props.updateTotalQuantityPrice(props.id, quantity * props.price)
            playplusMinusSound()
        }
      
    }

  
    const playRemoveSound = () => {
     const soundRemove = new Audio(removeSound)
           soundRemove.volume = 0.3
           soundRemove.play()
    }

    const removeOrder = () => {
        props.removeOrder(props.id)
        playRemoveSound()
    }
 
    const playplusMinusSound = () => {
     const minusPlusSound = new Audio(sound)
           minusPlusSound.volume = 0.1
           minusPlusSound.play()
    }

    return (
        <div className={style.orderWrapper}>

            <div className={style.nameWrapper}>
                <span className={style.name}>{props.name}</span>
                <img  src = {props.photo} alt = 'product'/>
            </div>

            <div className = {style.sizeWrapper}>
               <Size size = {sizeShoes} 
                     setSizeShoes = {setSizeShoes} 
                     updateSize = {props.updateSize}
                     id = {props.id}
                />
            </div>

            <div className={style.quantityWrapper}>
                <button className={style.minusWrapper} onClick={minusProductQuantity}>
                    <AiOutlineMinusCircle className={style.minus} />
                </button>
                <span className={style.quantity}>{quantity}</span>
                <button className={style.plusWrapper} onClick={plusProductQuantity}>
                    <AiOutlinePlusCircle className={style.plus} />
                </button>
            </div>

            <div className={style.priceQuantityWrapper}>
                <span className={style.priceQuantity}>{quantity * props.price}</span>
                <span className={style.currency}>{props.currency}</span>
            </div>
            <span className={style.closeOrder} onClick={removeOrder} >
                {<BsTrash />}
            </span>

        </div>
    )
})

export default Order;





























