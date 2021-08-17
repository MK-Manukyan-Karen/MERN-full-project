import { createSelector } from "reselect";

const getProductsSelector = (state) => {
    return  state.productsPage.products;
}

//for example reselect-selector
export const getProducts = createSelector(getProductsSelector,(products) => {
      return products.filter( (u)=> true)
})