import React from 'react';
import style from './ShowModal.module.css';


const ShowModal = ({ changeShowModalActive, showModalActive,children}) => {

    return (
        <div className={showModalActive ? `${style.modalContainer} ${style.active}` : style.modalContainer}>
            <span className={style.closeModal} onClick={changeShowModalActive}></span>
            <div className={showModalActive ? `${style.modalContent} ${style.active}`: style.modalContent }>
                
               {children}
            </div>
        </div>
    )
}


export default ShowModal;


//Exemple
/* <ShowModal changeShowModalActive={changeShowModalActive} showModalActive={showModalActive} > 
    < Children />
</ShowModal> */





