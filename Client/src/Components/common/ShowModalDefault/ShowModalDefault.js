import React from 'react';
import style from './ShowModalDefault.module.css';
import 'react-calendar/dist/Calendar.css';

const ShowModalDefault = React.memo( ({ changeShowModalActive,showModalActive,children }) => {

    return (
        <div className={showModalActive ? `${style.modalContainer} ${style.active}` : style.modalContainer}>
            <span className={style.closeModal} onClick={changeShowModalActive}></span>
            <div className={showModalActive ? `${style.modalContent} ${style.active}`: style.modalContent }>
              {children}
            </div>
        </div>
    )
})


export default ShowModalDefault;


//Exemple
/* <ShowModal changeShowModalActive={changeShowModalActive} showModalActive={showModalActive} > 
    < Children />
</ShowModal> */





