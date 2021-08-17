import {AiFillHome} from 'react-icons/ai';
import {IoIosPaper,IoMdPeople} from 'react-icons/io';
import {GiBookCover} from 'react-icons/gi';


export const isOwnerSideBarData = [
    {
        title : 'Գլխավոր',
        path : '/home',
        icon : AiFillHome,
        cName : 'navLinks'
    },
    {
        title : 'Մեր ապրանքները',
        path : '/products',
        icon : IoIosPaper,
        cName : 'navLinks'
    },

    {
        title : 'Կապ Մեզ հետ',
        path : '/contact',
        icon : IoMdPeople,
        cName : 'navLinks'
    },

    {
        title : 'Պահոց',
        path : '/orders/history',
        icon : GiBookCover,
        cName : 'navLinks'
    },
 
    
]
