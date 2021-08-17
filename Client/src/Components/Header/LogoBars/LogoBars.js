import React from 'react';
import style from './LogoBars.module.css';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const LogoBars = React.memo( (props) => {

    return (
        <div className={style.menuIcon} >
            {props.sidebar ? <span className={style.close} onClick={()=> props.toggleSideBar(false)}>
                                <AiOutlineClose />
                             </span>
                           : <span className={style.bars}onClick={()=> props.toggleSideBar(true)}>
                                <FaBars />
                            </span>
            }
        </div>
    )
})

export default LogoBars;

