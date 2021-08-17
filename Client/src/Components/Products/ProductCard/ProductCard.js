import React from 'react';
import style from './ProductCard.module.css';
import Size from './Size/Size';
import { PlusMinus } from './PlusMinus/PlusMinus';
import soundAddProduct from '../../../Assets/audio/button.mp3';



export const ProductCard = (props) => {

  const [image, setImage] = React.useState(`http://localhost:5000/${props.photo.photo1}`)
  let [quantity, setQuantity] = React.useState(props.quantity)
  let [sizeShoes, setSizeShoes] = React.useState(props.size)


  const playBtnSound = () => {
    const buttonSound = new Audio(soundAddProduct)
    buttonSound.volume = 0.3
    buttonSound.play()
  }

  const addNewOrder = (e) => {
    playBtnSound()

    props.setOrder(
      props.productId,
      props.name,
      image,
      sizeShoes,
      quantity,
      props.price,
      props.currency,
    )
  }

  return (
    <div className={style.container}>

      <ul className={style.thumb}>
        <li onMouseOver={() => setImage(`http://localhost:5000/${props.photo.photo1}`)}>
          <img src={`http://localhost:5000/${props.photo.photo1}`} alt = 'product'/>
        </li>
        <li onMouseOver={() => setImage(`http://localhost:5000/${props.photo.photo2}`)}>
          <img src={`http://localhost:5000/${props.photo.photo2}`} alt = 'product'/>
        </li>
        <li onMouseOver={() => setImage(`http://localhost:5000/${props.photo.photo3}`)}>
          <img src={`http://localhost:5000/${props.photo.photo3}`} alt = 'product' />
        </li>
      </ul>
      <div className={style.imgBox}>
        <h2>{props.name}</h2>
        <p className={style.price}>{props.price}<span className={style.currency}>{props.currency}</span></p>
        <img src={image} alt='product' />
        <Size setSizeShoes={setSizeShoes} size={sizeShoes} />
        <PlusMinus quantity={quantity} setQuantity={setQuantity} />
        <button className={style.btn} onClick={addNewOrder}>{'Ավելացնել'}</button>
      </div>

    </div>
  );
}
