import { getAuthUserData } from './Auth-reducer';
const SET_INITIALIZED = 'My-project/App/SET_INITIALIZED';

let initialState = {
    initialized: false,
}

const appReducer =  (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            };

        default: return state;
    }
}

//this is  ActionCreator

export const initializedSuccess = () => {
    return {
        type: SET_INITIALIZED,
    };
}

//this is  thunks


export const initializeApp = () => {
    return (dispatch) => {
        let resultGetAuthUserData = dispatch(getAuthUserData());
        Promise.all([resultGetAuthUserData]).then(() => {
            dispatch(initializedSuccess());
        })
    }
}

export default appReducer;
