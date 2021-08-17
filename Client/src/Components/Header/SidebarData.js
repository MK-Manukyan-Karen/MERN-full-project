import {AiFillHome} from 'react-icons/ai';
import {IoIosPaper,IoMdPeople} from 'react-icons/io';
import {GoTasklist} from 'react-icons/go';


export const SidebarData = [
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
        title : 'Մեր մասին',
        path : '/aboutUs',
        icon : GoTasklist,
        cName : 'navLinks'
    },
    {
        title : 'Կապ Մեզ հետ',
        path : '/contact',
        icon : IoMdPeople,
        cName : 'navLinks'
    },
 
    
]
