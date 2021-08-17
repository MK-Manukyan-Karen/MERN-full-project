import React from "react";
import style from './Loading.module.css';

const Loading = (props) => {
  return (
    <div className={style.container}>

        <div className = {`${style.center} ${style.center1}`}>
          <div className = {style.ring}></div>
        </div>
        <div className = {`${style.center} ${style.center2}`}>
          <div className = {style.ring}></div>
        </div>
        <div className = {`${style.center} ${style.center3}`}>
          <div className = {style.ring}></div>
        </div>
      </div>

  );
}

export default Loading
