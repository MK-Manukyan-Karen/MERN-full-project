import { authAPI, profileAPI } from './../../API-request/API';
import { stopSubmit } from 'redux-form';
import { removeAllOrder } from './Order-reducer';
const SET_USER_DATA = 'My-Project/auth/SET-USER-DATA';
const SET_PHOTO_SUCCSESS = 'My-Project/Profile/SET_PHOTO_SUCCSESS';
const SET_USER_NAME = 'My-Project/Profile/SET_USER_NAME';
const TOGGLE_IS_LOADING_AUTH = 'My-Project/Auth/TOGGLE_IS_LOADING_AUTH';
const SET_REGISTER_DATA = 'My-Project/Auth/SET_REGISTER_DATA';
const SET_LOGIN_DATA = 'My-Project/Auth/SET_LOGIN_DATA';
const SET_IS_AUTH = 'My-Project/Auth/SET_IS_AUTH';



let initialState = {
    userId: null,
    userName: '',
    email: null,
    isAuth: false,
    userPhoto: '',
    isLoading: false,
    registerData : {
         userName : null,
         email : null,
         password : null
         },
    loginData : {
         email : null,
         password : null
        }

}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:

            return {
                ...state, ...action.payload,
            };

        case SET_PHOTO_SUCCSESS:
            return {
                ...state, userPhoto: action.photo,
            };

        case SET_USER_NAME:
            return {
                ...state, userName: action.newUserName,
            };

        case TOGGLE_IS_LOADING_AUTH:
            return {
                ...state,
                isLoading: action.isLoading
            };

        case SET_REGISTER_DATA:
             return {
                ...state,
                registerData: {
                    userName : action.userName,
                    email : action.email,
                    password:action.password
                }
            };

        case SET_LOGIN_DATA:
             return {
                ...state,
                loginData: {
                       email : action.email,
                       password:action.password
                   }
            };

        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            };
            


        default: return state;
    }
}

//this is  ActionCreator

export const setAuthUserData = (userId, userName, email, userPhoto) => {

    return {
        type: SET_USER_DATA,
        payload: { userId, userName, email, userPhoto },
    }
}
export const setPhotoSuccess = (photo) => {
    return ({
        type: SET_PHOTO_SUCCSESS,
        photo: photo,
    });
}

export const setUserName = (newUserName) => {
    return ({
        type: SET_USER_NAME,
        newUserName: newUserName,
    });
}

export const toggleIsLoadingAuth = (isLoading) => {
    return {
        type: TOGGLE_IS_LOADING_AUTH,
        isLoading: isLoading,
    }
  }

  export const setRegisterDataAC = (userName,email,password) => {

    return {
        type: SET_REGISTER_DATA,
        userName,
        email,
        password
    }
  }

  export const setLoginDataAC = (email,password) => {
    return {
        type: SET_LOGIN_DATA,
        email,
        password
    }
  }
  export const setIsAuthAC = (isAuth) => {
    return {
        type: SET_IS_AUTH,
        isAuth
    }
  }



//this is  thunks
export const getAuthUserData = () => {

    return async (dispatch) => {
     
        try {
            dispatch(toggleIsLoadingAuth(true))
            const response = await authAPI.getMyProfile();

            if (response.status === 202) {
                let { _id, userName, email, imgSrc } = response.data.myData;
                dispatch(setAuthUserData(_id, userName, email, imgSrc));
                dispatch(setIsAuthAC(true))
            }
        } catch (error) {
            console.log(error)
        }finally{
            dispatch(toggleIsLoadingAuth(false))
        }

    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        try{
            dispatch(toggleIsLoadingAuth(true))
            const response = await profileAPI.updateProfilPhoto(file);
            if (response.status === 200) {
                dispatch(setPhotoSuccess(response.data.imgSrc));
            }
        }catch(err){
            if(err.response.status === 401){
                dispatch(setIsAuthAC(false))
            }
          console.log(err)
        }finally{
          dispatch(toggleIsLoadingAuth(false))
        }
      
    }
}

export const updateUserName = (newUserName) => {
    return async (dispatch) => {
      try{
        dispatch(toggleIsLoadingAuth(true))
        const response = await profileAPI.updateUserName(newUserName);
        if (response.status === 200) {
            dispatch(setUserName(response.data.userName));
        }
      }catch(err){
        if(err.response.status === 401){
            dispatch(setIsAuthAC(false))
        }
      }finally{
        dispatch(toggleIsLoadingAuth(false))
      }
      
    }
}



export const Login = (authDate) => {
    let { email, password, rememberMe } = authDate;
    return async (dispatch) => {
        dispatch(toggleIsLoadingAuth(true))
        let response = await authAPI.postAuthLoginData(email, password, rememberMe);
    
        if (response.status === 200) {
            dispatch(setLoginDataAC(null, null))
            dispatch(setIsAuthAC(true))
            dispatch(getAuthUserData());
        }
        if (response.status === 401) {
            let errorMessage = response.data.message
                ? response.data.message
                : response.statusText
            dispatch(setLoginDataAC(email, password))
            dispatch(toggleIsLoadingAuth(false))
            dispatch(stopSubmit('Login', { _error: errorMessage }));
        } else if (response.status === 404) {

            let errorMessage = response.data.message
                ? response.data.message
                : response.statusText
            dispatch(setLoginDataAC(email, password))
            dispatch(toggleIsLoadingAuth(false))
            dispatch(stopSubmit('Login', { _error: errorMessage }));
        }
    }
}

export const Register = (userName, email, password) => {

    return async (dispatch) => {
        try {
                dispatch(toggleIsLoadingAuth(true))
            let response = await authAPI.postAuthRegsterData(userName, email, password);
        
            if (response.status === 201) {
                let messageOK = response.data.message;
                dispatch( setRegisterDataAC(null, null, null))
                dispatch(toggleIsLoadingAuth(false))
                dispatch(stopSubmit('Register', { _error: messageOK }));
              
            }
        } catch (error) {
            if (error.response.status === 409) {
             
                let errorMesagge = error.response.data.message
                    ? error.response.data.message
                    : error.response.statusText
               dispatch( setRegisterDataAC(userName, email, password))
                dispatch(toggleIsLoadingAuth(false))
                dispatch(stopSubmit('Register', { _error: errorMesagge }));
               
            }
        }
    }
}


export const logOut = () => {
    return async (dispatch) => {
        dispatch(toggleIsLoadingAuth(true))
        const response = await authAPI.deleteAuthLoginData();
        let isAuth = response.data.isAuth
        if (response.status === 200) {
            dispatch(setIsAuthAC(false))
            dispatch(setAuthUserData(null, null, null, isAuth));
            dispatch(removeAllOrder())
            dispatch(toggleIsLoadingAuth(false))
        }
    }
}

export default authReducer;
