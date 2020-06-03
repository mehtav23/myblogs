import { REGISTERING, REGISTRATION_FAILED, REGISTRATION_SUCCESS, CLEAR_REGISTRATION_FAILED_ERROR_MESSAGE} from '../actions/types';
const initialState = {
    userName: null,
    isRegistering: false,
    errorMessage: null
}

export default (state= initialState, action)=> {
    switch(action.type) {
        case REGISTERING:
            return {...state, userName: action.payload.userName, isRegistering: true, errorMessage: null};
        case REGISTRATION_SUCCESS:
            return {...state, userName: null, isRegistering: false, errorMessage: null}
        case REGISTRATION_FAILED: 
            return {...state, userName: null, isRegistering: false, errorMessage: action.payload}
        case CLEAR_REGISTRATION_FAILED_ERROR_MESSAGE:
            return {...state, errorMessage:null}
        default: return state;
    }
}