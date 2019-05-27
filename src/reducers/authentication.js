import { handleActions } from 'redux-actions';
import { LOGIN_USER } from './../constants/index';
import isEmpty from './../auth/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
}


export const authentication = handleActions({
    [LOGIN_USER]: (state = initialState, action) => {
        const payload = JSON.parse(action.payload);
        const {data, success} = payload;
        if(!isEmpty(data) && success===true){
            const { auth_token } = data;
            localStorage.setItem('jwtToken', auth_token);
            localStorage.setItem('auth', JSON.stringify(data));
        }else{
            action.payload = {};
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('auth');
        }
        return {
            ...state,
            isAuthenticated: !isEmpty(payload),
            user: payload
        };
    },
}, []);
