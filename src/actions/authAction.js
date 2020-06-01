import axios from '../apis';
import createBrowserHistory from '../history';
import getAuthHeader from './headerToken';
import { LOGIN_SUCCESS, LOGIN_FAILED, SIGN_OUT } from './types'
export const signIn = (formValues) => {
    return async (dispatch) => {
        const {email, password} = formValues; 
        try {
            const response = await axios.post('/users/login', {'user':{email, password}});
            console.log(response.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            createBrowserHistory.push('/');
        } catch(error) {
            console.log('Error', error);
            dispatch({
                type: LOGIN_FAILED,
                payload: error
            });
        }
        
    }
}

export const getCurrentUser = () =>{
    return async (dispatch) => {
        try {
            const headers = getAuthHeader();
            let response;
            if(headers.Authorization) {
                response = await axios.get('/user', {headers: headers});
                dispatch({type:LOGIN_SUCCESS, payload: response.data});
            }
        }catch(error){
            dispatch({type:LOGIN_FAILED, payload: error});
        }
    }
    
}


export const signOut = () => {
    return {
        type: SIGN_OUT,
    }
}