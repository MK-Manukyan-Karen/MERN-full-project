import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import productsReducer from './reducer/Products-reducer';
import ordersReducer from './reducer/Order-reducer';
import ordersHistoryReducer from './reducer/OrdersHistory-reducer';
import authReducer from './reducer/Auth-reducer';
import appReducer from './reducer/App-Reducer';
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({

    productsPage : productsReducer,
    ordersPage : ordersReducer,
    historyPage : ordersHistoryReducer,
    auth : authReducer,
    form:formReducer,
    app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

window.store = store;
export default store;