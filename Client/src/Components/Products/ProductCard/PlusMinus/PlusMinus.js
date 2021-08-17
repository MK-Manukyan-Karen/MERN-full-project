import React from 'react';
import style from './PlusMinus.module.css';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import soundQuantity from '../../../../Assets/audio/button3.mp3'


export const PlusMinus = (props) => {
let quantity = props.quantity
let setQuantity = props.setQuantity


const playPlusMinusSound = () => {
const plusMinuSound = new Audio(soundQuantity)
      plusMinuSound.volume = 0.2
      plusMinuSound.play()
}

  const plus = () => {
      if (quantity < 99) {
          setQuantity(++quantity)
          playPlusMinusSound()
      }
  
  }
  const minus = () => {
      if (quantity > 1) {
          setQuantity(--quantity)
          playPlusMinusSound()
      }
    
  }

  const updateQuantity = () => {
      if (quantity === '') {
          quantity = 1
      }
      setQuantity(quantity);
  }
  const onChangeQuantity = (e) => {
      if (e.currentTarget.value > 99) {
          return false
      }
      setQuantity(e.currentTarget.value);
  }

  return (
 
      <div className={style.quantityWrapper}>
                <button onClick={minus} className={style.minusWrapper}>
                    <AiOutlineMinusCircle className={style.minus} />
                </button>

                <input value={quantity} className={style.input} type={'number'} max="99"
                       onChange={onChangeQuantity} onBlur={updateQuantity} />

                <button onClick={plus} className={style.plusWrapper}>
                    <AiOutlinePlusCircle className={style.plus} />
                </button>
    </div>
  );
}
