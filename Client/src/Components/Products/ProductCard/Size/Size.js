import React from 'react';
import style from './Size.module.css';
import sound from '../../../../Assets/audio/button2.mp3'



const Size = (props) => {
    let [size39, setSize39] = React.useState(props.size === 39 ? true : false)
    let [size40, setSize40] = React.useState(props.size === 40 ? true : false)
    let [size41, setSize41] = React.useState(props.size === 41 ? true : false)
    let [size42, setSize42] = React.useState(props.size === 42 ? true : false)


    const updateSize = (param) => {
       if(props.updateSize){
        props.updateSize(props.id,param)
       }
    }

    const onChangeActiveSize39 = (param) => {
        !size39 ? props.setSizeShoes(param) :props.setSizeShoes(null)
        setSize39(true)
        setSize40(false)
        setSize41(false)
        setSize42(false)
        updateSize(param)
        playBtnSound()
    }

    const onChangeActiveSize40 = (param) => {
        !size40 ? props.setSizeShoes(param) : props.setSizeShoes(null)
        setSize39(false)
        setSize40(active => !active)
        setSize41(false)
        setSize42(false)
        updateSize(param)
        playBtnSound()
    }
    const onChangeActiveSize41 = (param) => {
        !size41 ? props.setSizeShoes(param) : props.setSizeShoes(null)
        setSize39(false)
        setSize40(false)
        setSize41(active => !active)
        setSize42(false)
        updateSize(param)
        playBtnSound()

    }
    const onChangeActiveSize42 = (param) => {
        !size42 ? props.setSizeShoes(param) : props.setSizeShoes(null)
        setSize39(false)
        setSize40(false)
        setSize41(false)
        setSize42(active => !active)
        updateSize(param)
        playBtnSound()
    }

  
    const playBtnSound = () => {
     const buttonSound = new Audio(sound)
           buttonSound.volume = 0.1
           buttonSound.play()
    }

    return (
        <ul className={style.size} >
            <span>{'Չափսը`'}</span>
            <li className={size39 ? style.active : style.sizeNumber} onClick={() => onChangeActiveSize39(39)} >39</li>
            <li className={size40 ? style.active : style.sizeNumber} onClick={() => onChangeActiveSize40(40)} >40</li>
            <li className={size41 ? style.active : style.sizeNumber} onClick={() => onChangeActiveSize41(41)} >41</li>
            <li className={size42 ? style.active : style.sizeNumber} onClick={() => onChangeActiveSize42(42)} >42</li>
        </ul>
    )
}

export default Size