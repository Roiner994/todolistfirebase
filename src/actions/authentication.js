import { LOGIN_USER } from "../constants";
import { createAction } from 'redux-actions';
import { authFirebase } from "../api";
// import { urlAuth } from "../api/urls";



export const authentication = createAction(LOGIN_USER,
    (provider) => authFirebase(provider)() );

export const authUser = createAction(LOGIN_USER, (user) => JSON.stringify(user));

export const setCurrentUser = user => {
    const objPayload = { data: user, success: true };
    return {
        type: LOGIN_USER,
        payload: JSON.stringify(objPayload)
    }
}