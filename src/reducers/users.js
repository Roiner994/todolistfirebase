import { handleActions } from 'redux-actions';
import { FETCH_USERS, INSERT_USER, UPDATE_USER, DELETE_USER } from './../constants/index';
export const users = handleActions({
    [FETCH_USERS]: (state, action) => action.payload.data ? [...action.payload.data] : action.payload,
    [INSERT_USER]: (state, action) => [...state , action.payload.data],
    [UPDATE_USER]: (state, action) => {
        if(action.error)
            return state;
        
        const userPayload = action.payload;
        const {id} = userPayload;
        const users = state;
        const initialValue = [];
        const newUser = users.reduce( (acc, newUser) => {
            if (newUser.id === id){
                return [ ...acc, userPayload];
            }else{
                return [ ...acc, newUser];
            }
        }, initialValue );
        return newUser;
    },
    [DELETE_USER] : (state, action) => action.payload.success ? 
                                        state.filter(c => c.id !== action.payload.data.id) 
                                        : state
}, []);
