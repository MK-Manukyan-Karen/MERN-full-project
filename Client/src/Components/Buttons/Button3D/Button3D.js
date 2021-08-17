import React from 'react';
import style from './Button3D.module.css';
export const Button3D = React.memo ( (props) => {
  return (

        <div className = {style.btn}>
            <div className = {`${style.side} ${style.defaultSide}`}>{props.front}</div>
            <button className = {`${style.side} ${style.hoverSide}`} onClick = {props.callBack}>
              {props.back}
            </button>
        </div>
  );
})
