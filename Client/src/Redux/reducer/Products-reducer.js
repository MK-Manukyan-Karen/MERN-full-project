
import { productsAPI } from '../../API-request/API';
const SET_PRODUCTS = 'My-Project/Products/SET_PRODUCTS';
const SET_NUMBER_PAGE = 'My-Project/Products/SET_NUMBER_PAGE';
const PRODUCTS_TOTAL_COUNT = 'My-Project/Products/PRODUCTS_TOTAL_COUNT';
const TOGGLE_IS_LOADING = 'My-Project/Priducts/TOGGLE_IS_LOADING';
const SET_PORTION_NUMBER = 'My-Project/Products/SET_PORTION_NUMBER';

let initialState = {
  products: [],
  pageSize: 6,
  currentPage: 1,
  totalProductsCount: null,
  isLoading: false,
  portionNumber: 1,
}

const productsReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products
      };

    case SET_NUMBER_PAGE:
      return {
        ...state,
        currentPage: action.currentPageNumber
      };

    case SET_PORTION_NUMBER:
      return {
        ...state,
        portionNumber: action.portionNumber
      };

    case PRODUCTS_TOTAL_COUNT:
      return {
        ...state,
        totalProductsCount: action.productsTotalCount
      };

    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    default: return state;
  }
}

//Action Creators

export const setProducts = (products) => {
  return {
      type: SET_PRODUCTS,
      products: products,
  }
}

export const setCurrentPage = (currentPageNumber) => {
  return ({
      type: SET_NUMBER_PAGE,
      currentPageNumber: currentPageNumber,
  })
}

export const setPortionNumber = (portionNumber) => {
  return ({
      type: SET_PORTION_NUMBER,
      portionNumber: portionNumber,
  })
}

export const setProductTotalCount = (productTotalCount) => {
  return ({
      type: PRODUCTS_TOTAL_COUNT,
      productsTotalCount: productTotalCount,
  })
}

export const toggleIsLoading = (isLoading) => {
  return {
      type: TOGGLE_IS_LOADING,
      isLoading: isLoading,
  }
}


//thunks
export const requestProducts = (currentPage, pageSize) => {
  return async (dispatch) => {
      dispatch(toggleIsLoading(true));
      dispatch(setCurrentPage(currentPage));
      const response = await productsAPI.getProducts(currentPage,pageSize);
      dispatch(toggleIsLoading(false));
      dispatch(setProducts(response.data.products));
      dispatch(setProductTotalCount(response.data.totalCount));
  }
}
export const onProductsPageChanged = (p, pageSize) => {
  return async (dispatch) => {
      dispatch(setCurrentPage(p));
      dispatch(toggleIsLoading(true));
      const response = await productsAPI.getProducts(p, pageSize);
      dispatch(toggleIsLoading(false));
      dispatch(setProducts(response.data.products));
  }
}


export default productsReducer;










