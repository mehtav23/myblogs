import { REGISTERING, REGISTRATION_FAILED, REGISTRATION_SUCCESS} from '../actions/types';
const initialState = {
    userName: null,
    isRegistering: false
}

export default (state= initialState, action)=> {
    switch(action.type) {
        case REGISTERING:
            return {...state, userName: action.payload.userName, isRegistering: true};
        case REGISTRATION_SUCCESS:
        case REGISTRATION_FAILED: {
            return {...state, userName: null, isRegistering: false};
        }
        default: return state;
    }
}