import {REGISTERING,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    CLEAR_REGISTRATION_FAILED_ERROR_MESSAGE
    } from './types'



import axios from '../apis';


import createBrowserHistory from '../history';

export const signUp = (formValues) => {
    return async (dispatch) => {
        const {userName, email, password} = formValues; 
        try {
            dispatch({type: REGISTERING, payload: {userName}});
            const response = await axios.post('/users', {'user':{username: userName, email, password}});
            console.log(response.data);
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: response.data
            });
            createBrowserHistory.push('/signIn');
        } catch(error) {
            console.log('Error', error);
            const [key, errorStatement] = Object.entries(error.response.data.errors)[0];
            dispatch({
                type: REGISTRATION_FAILED,
                payload: key + ' ' + errorStatement
            });
            setTimeout(()=>dispatch({type:CLEAR_REGISTRATION_FAILED_ERROR_MESSAGE}), 3000);
        }
        
    }
}