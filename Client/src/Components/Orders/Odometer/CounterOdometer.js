import React from 'react';
import './CounterOdometer.css'
import Odometer from 'react-odometerjs';


const CounterOdometer = (props) => {
 
    return (
            <Odometer
              value={props.value}
              theme="custom"
              duration={500}
            />
    );
  }

export default CounterOdometer;
