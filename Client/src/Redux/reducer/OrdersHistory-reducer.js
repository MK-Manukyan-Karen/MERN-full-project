import { ordersAPI } from '../../API-request/API';
import { setIsAuthAC } from './Auth-reducer';
const SET_ORDERS = 'My-Project/History/SET_ORDERS';
const TOGGLE_IS_LOADING_HISTORY = 'My-Project/History/TOGGLE_IS_LOADING_HISTORY';
const SET_NUMBER_PAGE = 'My-Project/OrdersHistory/SET_NUMBER_PAGE';
const SET_PORTION_NUMBER = 'My-Project/OrdersHistory/SET_PORTION_NUMBER';
const ORDERS_TOTAL_COUNT = 'My-Project/OrdersHistory/ORDERS_TOTAL_COUNT';
const SET_ERROR_MESSAGE = 'My-Project/SET_ERROR_MESSAGE/SET_ERROR_MESSAGE';
const SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT = 'My-Project/SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT';
const SET_SEARCH_DATA_PRICE = 'My-Project/SET_SEARCH_DATA_PRICE';
const SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT = 'My-Project/SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT';
const SET_SEARCH_DATE_DATA = 'My-Project/SET_SEARCH_DATE_DATA';


let initialState = {
  orders: [],
  isLoading: true,
  currentPage: 1,
  pageSize: 5,
  totalOrdersCount: null,
  portionNumber: 1,
  message: '',
  searchByPirceTotalCount: null,
  searchOrdersPrice: null,
  searchByDateTotalCount: null,
  searchOrdersDate: '',

}

const ordersHistoryReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      };


    case TOGGLE_IS_LOADING_HISTORY:
      return {
        ...state,
        isLoading: action.isLoading
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

    case ORDERS_TOTAL_COUNT:
      return {
        ...state,
        totalOrdersCount: action.ordersTotalCount
      };

    case SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT:
      return {
        ...state,
        searchByPirceTotalCount: action.ordersTotalCount
      };

    case SET_SEARCH_DATA_PRICE:
      return {
        ...state,
        searchOrdersPrice: { ...action.dataPrice }
      };

    case SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT:
      return {
        ...state,
        searchByDateTotalCount: action.ordersTotalCount
      };

    case SET_SEARCH_DATE_DATA:
      return {
        ...state,
        searchOrdersDate: action.dataDate
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        message: action.message
      };



    default: return state;
  }
}

//Action Creators

export const setOrders = (orders) => {

  return ({
    type: SET_ORDERS,
    orders: orders
  })
}

export const toggleIsLoadingHistory = (isLoading) => {

  return {
    type: TOGGLE_IS_LOADING_HISTORY,
    isLoading: isLoading,
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

export const setOrdersTotalCount = (ordersTotalCount) => {

  return ({
    type: ORDERS_TOTAL_COUNT,
    ordersTotalCount: ordersTotalCount,
  })
}

export const setSearchByPriceTotalCount = (ordersTotalCount) => {

  return ({
    type: SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT,
    ordersTotalCount: ordersTotalCount,
  })
}
export const setSearchDataPrice = (dataPrice) => {
  return ({
    type: SET_SEARCH_DATA_PRICE,
    dataPrice: dataPrice,
  })
}

export const setSearchByDateTotalCount = (ordersTotalCount) => {

  return ({
    type: SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT,
    ordersTotalCount: ordersTotalCount,
  })
}
export const setSearchDateData = (dataDate) => {
  return ({
    type: SET_SEARCH_DATE_DATA,
    dataDate: dataDate,
  })
}

export const setErrorMessage = (message) => {

  return ({
    type: SET_ERROR_MESSAGE,
    message,
  })
}

//thunks
export const getOrdersHistory = (currentPage, pageSize) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsLoadingHistory(true))
      dispatch(setCurrentPage(currentPage));
      let orders = await ordersAPI.getOrders(currentPage, pageSize)
      if(orders.status === 200){
        dispatch(setOrders(orders.data.orders))
        dispatch(setOrdersTotalCount(orders.data.totalOrderCount));
      }
    } catch (err) {
      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
    } finally {
      dispatch(toggleIsLoadingHistory(false))
    }
  }
}

export const searchOrdersByDate = (currentPage, pageSize, orderDate) => {

  return async (dispatch) => {
    try{
      dispatch(toggleIsLoadingHistory(true))
      let orders = await ordersAPI.getOrdersByDate(currentPage, pageSize, orderDate)
      if (orders.status === 200) {
        dispatch(setOrders(orders.data.orders))
        dispatch(setSearchByDateTotalCount(orders.data.totalOrderCount));
        dispatch(setSearchDateData(orderDate))
      }

    }catch (err) {
      
      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
      if (err.response.status === 404) {
        let errorMessage = err.response.data.message
          ? err.response.data.message
          : err.response.statusText
        dispatch(setErrorMessage(errorMessage))
        dispatch(setOrders([]))
      }

    }finally {
      dispatch(toggleIsLoadingHistory(false))
    }
  }
}
export const searchOrdersByPrice = (currentPage, pageSize, searchDataPrice) => {

  return async (dispatch) => {
    try{
      dispatch(toggleIsLoadingHistory(true))
      let orders = await ordersAPI.getOrdersByPrice(currentPage, pageSize, searchDataPrice)
      if (orders.status === 200) {
        dispatch(setOrders(orders.data.orders))
        dispatch(setSearchByPriceTotalCount(orders.data.totalOrderCount));
        dispatch(setSearchDataPrice(searchDataPrice))
      }

    }catch (err) {

      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
      if (err.response.status === 404) {
        let errorMessage =err.response.data.message
          ? err.response.data.message
          : err.response.statusText
        dispatch(setErrorMessage(errorMessage))
        dispatch(setOrders([]))
      }

    }finally {
      dispatch(toggleIsLoadingHistory(false))
    }
  }
}

export const changePagesOfSearchOrdersByPrice = (p, pageSize, searchOrderPrice) => {

  return async (dispatch) => {
    try{
      dispatch(toggleIsLoadingHistory(true))
      dispatch(setCurrentPage(p));
      let orders = await ordersAPI.getOrdersByPrice(p, pageSize, searchOrderPrice)
      dispatch(setOrders(orders.data.orders));
    }catch (err) {
      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
    }finally {
      dispatch(toggleIsLoadingHistory(false))
    }
  }
}

export const changePagesOfSearchOrdersByDate = (p, pageSize, searchOrderDate) => {

  return async (dispatch) => {
    try{
      dispatch(toggleIsLoadingHistory(true))
      dispatch(setCurrentPage(p));
      let orders = await ordersAPI.getOrdersByDate(p, pageSize, searchOrderDate)
      dispatch(setOrders(orders.data.orders));
    }catch (err) {
      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
    }finally {
      dispatch(toggleIsLoadingHistory(false))
    }


  }
}


export const onOrdersHistoryPageChanged = (p, pageSize) => {

  return async (dispatch) => {
    try{
      dispatch(toggleIsLoadingHistory(true))
      dispatch(setCurrentPage(p));
      const orders = await ordersAPI.getOrders(p, pageSize);
      dispatch(setOrders(orders.data.orders));
    }catch (err) {
      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
    }finally {
      dispatch(toggleIsLoadingHistory(false))
    }
   
  }
}


export const removeAllOrdersHistory = () => {
  return async (dispatch) => {
    try{
      dispatch(toggleIsLoadingHistory(true))
      let orders = await ordersAPI.removeAllhistory()
      if (orders.status === 200) {
        dispatch(getOrdersHistory())
      }

    }catch (err) {
      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
    }finally {
      dispatch(toggleIsLoadingHistory(false))
    }

  }
}

export const removeOneOrder = (orderID, currentPage, pageSize) => {

  return async (dispatch) => {
    try{
      dispatch(toggleIsLoadingHistory(true))
      let orders = await ordersAPI.removeOneOrder(orderID)
      if (orders.status === 200) {
        dispatch(getOrdersHistory(currentPage, pageSize))
      }
    }catch (err) {
      if (err.response.status === 401) {
        dispatch(setIsAuthAC(false))
      }
    } finally {
      dispatch(toggleIsLoadingHistory(false))
    }
  }
}


export default ordersHistoryReducer;





