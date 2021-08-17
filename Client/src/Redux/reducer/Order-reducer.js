import { ordersAPI } from '../../API-request/API';
import { setIsAuthAC } from './Auth-reducer';
const SET_ORDER_BY_ID_PRODUCT = 'My-Project/Products/SET_ORDER_BY_ID_PRODUCT';
const UPDATE_QUANTITY_BY_ID_ORDER = 'My-Project/Products/UPDATE_QUANTITY_BY_ID_ORDER';
const UPDATE_TOTAL_QUANTITY_PRICE_BY_ID_ORDER = 'My-Project/Products/UPDATE_TOTAL_QUANTITY_PRICE_BY_ID_ORDER';
const REMOVE_ORDER_BY_ID = 'My-Project/Products/REMOVE_ORDER_BY_ID';
const REMOVE_ALL_ORDER = 'My-Project/Products/REMOVE_ALL_ORDER';
const TOGGLE_IS_LOADING_ORDER = 'My-Project/Orders/TOGGLE_IS_LOADING_ORDER';
const SET_ORDER_MESSAGE = 'My-Project/Orders/SET_ORDER_MESSAGE';
const UPDATE_SIZE_BY_ID_ORDER = 'My-Project/Orders/UPDATE_SIZE_BY_ID_ORDER';



let initialState = {
  orders: JSON.parse(sessionStorage.getItem('orders')) || [],
  isLoading: false,
  message : '',

}

const ordersReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_ORDER_BY_ID_PRODUCT:
 
      return {

        ...state,
        orders: state.orders.some((order) => order.id === action.order.id)
        ? [...state.orders].map((order) => {
          if (order.id === action.order.id) {
            if(order.size === action.order.size) {
              order.quantity += action.order.quantity
              order.photo = action.order.photo
            }else{
              order.size = action.order.size
              order.quantity = action.order.quantity
              order.photo = action.order.photo
            }
          }
          return order
        })
        : [...state.orders, { ...action.order, quantity: action.order.quantity }]

      }

    case UPDATE_QUANTITY_BY_ID_ORDER:

      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.orderId) {
            return {
              ...order,
              quantity: action.quantity
            }
          }
          return order
        })

      }

      case UPDATE_SIZE_BY_ID_ORDER:

        return {
          ...state,
          orders: state.orders.map((order) => {
            if (order.id === action.orderId) {
              return {
                ...order,
                size: action.size
              }
            }
            return order
          })
  
        }


    case UPDATE_TOTAL_QUANTITY_PRICE_BY_ID_ORDER:

      return {

        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.orderId) {
            return {
              ...order,
              totalQuantityPrice: action.countQuantityPrice
            }
          }
          return order
        })
      }

    case REMOVE_ORDER_BY_ID:

      return {
        ...state,
        orders: [...state.orders].filter((order) => order.id !== action.orderId)
      }

    case REMOVE_ALL_ORDER:

      return {
        ...state,
        orders: []
      }

    case TOGGLE_IS_LOADING_ORDER:
      return {
        ...state,
        isLoading: action.isLoading
      };

     case SET_ORDER_MESSAGE:
       return {
        ...state,
        message: action.message
      };
      
    default: return state;
  }
}

//Action Creators


export const setOrderAC = (productId,productName,photo,size,quantity, productPrice,currency) => {

  return ({
    type: SET_ORDER_BY_ID_PRODUCT,
    order : {
      id: productId,
      name: productName,
      photo,
      size,
      currency,
      quantity: quantity,
      price: productPrice
    }
  });
}

export const setQuantityAC = (orderId, quantity) => {
  return ({
    type: UPDATE_QUANTITY_BY_ID_ORDER,
    quantity: quantity,
    orderId: orderId
  });
}

export const setSizeAC = (orderId, size) => {
  return ({
    type: UPDATE_SIZE_BY_ID_ORDER,
    size,
    orderId,
  });
}


export const setTotalQuantityPrice = (orderId, countQuantityPrice) => {
  return ({
    type: UPDATE_TOTAL_QUANTITY_PRICE_BY_ID_ORDER,
    orderId: orderId,
    countQuantityPrice: countQuantityPrice
  });
}
export const removeOrderAC = (orderId) => {
  return ({
    type: REMOVE_ORDER_BY_ID,
    orderId: orderId,
  });
}
export const removeAllOrderAC = () => {
  return ({
    type: REMOVE_ALL_ORDER,
  });
}

export const setOrderMessage = (message) => {
  return ({
    type : SET_ORDER_MESSAGE,
    message : message
  })
}

export const setIsLoading = (isLoading) => {
  return ({
    type : TOGGLE_IS_LOADING_ORDER,
    isLoading : isLoading
  })
}



//thunks
export const setOrder = (productId,productName,photo,size,quantity, productPrice,currency) => {
  return (dispatch) => {
    dispatch(setOrderAC(productId,productName,photo,size,quantity, productPrice,currency))
  }
}

export const buyOrder =  (newOrder,totalPrice) => {
  return async (dispatch) => {
    try{
      dispatch(setIsLoading(true))
      let order = await ordersAPI.setOrders(newOrder,totalPrice)
      if(order.status === 201){
        dispatch(setOrderMessage(order.data.message))
      }
      
    }catch(err){
      if(err.response.status === 401){
       dispatch( setIsAuthAC(false) )
       dispatch(setOrderMessage(''))
      }
    }finally{
      dispatch(setIsLoading(false))
    }
   
  }
}


export const updateQuantity = (productId, quantity) => {
  return (dispatch) => {
    dispatch(setQuantityAC(productId, quantity));
  }
}
export const updateSize = (productId, size) => {
  return (dispatch) => {
    dispatch(setSizeAC(productId, size));
  }
}

export const updateTotalQuantityPrice = (productId, countQuantityPrice) => {
  return (dispatch) => {
    dispatch(setTotalQuantityPrice(productId, countQuantityPrice));
  }
}

export const removeOrder = (orderId) => {
  return (dispatch) => {
    dispatch(removeOrderAC(orderId));
  }
}

export const removeAllOrder = () => {
  return (dispatch) => {
    dispatch(removeAllOrderAC());
  }
}


export default ordersReducer;





