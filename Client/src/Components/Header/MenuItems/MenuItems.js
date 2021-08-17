import React,{useState} from 'react';
import style from './MenuItems.module.css';
import Item from './Item/Item'


const MenuItems = React.memo((props) => {
    const [width, setWidth] = useState()
    const [left, setLeft] = useState()
    const indicator = (e) => {
    
        setLeft(e.target.offsetLeft+'px');
        setWidth(e.target.offsetWidth+'px');  
      }

   

    return (
        <ul className={props.sidebar ? `${style.navMenu} ${style.active}` : style.navMenu}>
            {props.sideBarData.map((item, index) => {
                return <Item key={index} path={item.path} cName={item.cName}
                             title={item.title} Component={item.icon} toggleSideBar={props.toggleSideBar}
                             indicator = {indicator} 
                       />
            })}
           <div className = {style.indicator}  style = {{width,left}}></div>
        </ul>

    )
})

export default MenuItems;

