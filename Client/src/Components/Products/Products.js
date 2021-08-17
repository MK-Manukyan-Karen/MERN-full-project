import React from 'react';
import style from './Products.module.css';
import Pagination from '../common/Pagination/Pagination';
import { ProductCard } from './ProductCard/ProductCard';




const Products = React.memo(({ pageSize, currentPage, totalProductsCount, onPageChanged, products, ...props }) => {

  return (

    <div className={style.container} >
        <h2 className = {style.paragraph}>{'Մեր ապրանքները'}</h2>
      <div className={style.productsContainer}>
     
        {products.map((item) => {
          return (
            
            <div key={item._id}>
              <ProductCard   productId={item._id}
                          name={item.name}
                          photo = {item.photo}
                          size = {item.size}
                          price={item.price}
                          currency={item.currency}
                          quantity={item.quantity}
                          setOrder={props.setOrder}
              
              />  
            </div>
          )
        })}
      </div>

      <Pagination totalProductsCount={totalProductsCount}
                  pageSize={pageSize}
                  portionNumber={props.portionNumber}
                  currentPage={currentPage}
                  onPageChanged={onPageChanged}
                  setPortionNumber={props.setPortionNumber}
      />
   
    </div>
  )
})


export default Products