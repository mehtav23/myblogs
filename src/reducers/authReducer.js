import { LOGIN_SUCCESS, LOGIN_FAILED, SIGN_OUT } from '../actions/types';


const initialState = {
    isSignedIn: null,
    user: null,
};

export default (state = initialState, action)=>{
    switch(action.type) {
        case LOGIN_SUCCESS : 
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state, isSignedIn: true, user: action.payload
            };
        case LOGIN_FAILED : 
            return {
                ...state, isSignedIn: false, user: null
            }
        case SIGN_OUT: 
            localStorage.removeItem('user');
            return {
                ...state, isSignedIn: false, user: null
            }
        default: 
            return state;
    }
}