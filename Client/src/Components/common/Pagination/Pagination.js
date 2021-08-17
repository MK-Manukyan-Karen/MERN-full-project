import React from 'react';
import style from './Pagination.module.css';
import sound from '../../../Assets/audio/sound6.mp3';
// import cn from 'classnames';
// npm install classnames


const Pagination = ({portionSize = 3,portionNumber,setPortionNumber,...props}) => {

    let pagesCount = Math.ceil(props.totalProductsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };
 
    let portionCount = Math.ceil( pagesCount /portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const playBtnSound = () => {
      const buttonSound = new Audio(sound)
            buttonSound.volume = 0.2
            buttonSound.play()
     }
     const minusPortionNumber = () => {
           playBtnSound()
           setPortionNumber(portionNumber - 1)
     }
     const plusPortionNumber = () => {
      playBtnSound()
      setPortionNumber(portionNumber + 1)
     }

     const onPageChanged = (p) => {
      playBtnSound()
      props.onPageChanged(p)
     }
  

    return (
            <div className={style.buttonPageWrapper}>
              {portionNumber > 1 && 
                <button onClick = {minusPortionNumber} className = {style.prev}>
                   {'<<<'}
                </button> }
              {
                pages
                    .filter( p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {
                        return (
                            <button className={props.currentPage === p ? style.buttonCurrentPage : style.buttonPage}
                                    onClick={() => {onPageChanged(p) }} key = {p}>{p}
                            </button>
                            //  <button className={cn(
                            //   {[style.buttonCurrentPage] : props.currentPage === p },
                            //    style.buttonPage)}
                            //         onClick={() => { props.onPageChanged(p) }} key = {p}>{p}
                            // </button>
                        )
                    })
                    
                }
              {portionCount > portionNumber && 
                <button onClick = {plusPortionNumber}  className = {style.next}>
                      {'>>>'}
                </button> }
            </div> 
    )
}

export default Pagination;




