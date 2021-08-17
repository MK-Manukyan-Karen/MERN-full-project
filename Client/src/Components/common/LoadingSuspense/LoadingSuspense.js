import React from 'react';
import style from './LoadingSuspense.module.css';

const LodadingSuspense = (props) => {
  return (
    <div className = {style.container}>

      <div className = {style.Box}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    	</div>
      <div className = {style.waviy}>
        <span style = {{'--i': 1}}>L</span>
        <span style = {{'--i': 2}}>o</span>
        <span style = {{'--i': 3}}>a</span>
        <span style = {{'--i': 4}}>d</span>
        <span style = {{'--i': 5}}>i</span>
        <span style = {{'--i': 6}}>n</span>
        <span style = {{'--i': 7}}>g</span>
        <span style = {{'--i': 8}}>.</span>
        <span style = {{'--i': 9}}>.</span>
        <span style = {{'--i': 10}}>.</span>
        <span style = {{'--i': 11}}>.</span>
      </div> 
    </div>
  );
}

export default LodadingSuspense