import React from 'react';
import './CasketHoverButton.css';
import photo from './photos/gmail.png';


export const CasketHoverButton = React.memo( (props) => {
    return (
            <div className = "twitter social-button" >
                <div className = 'innerText'>
                {props.text}
                </div>
                <div className = "cover">
                    <div className = "inner"></div>
                    <div className = "edge"></div>
                    <div className = "outer">
                      <img src = {photo} alt = 'logo' className = 'logo'/>
                    </div>
                </div>
                <div className = "shadow"></div>
            </div>
    );
})