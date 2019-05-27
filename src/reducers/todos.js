import { handleActions } from 'redux-actions';
import { FETCH_TODOS, INSERT_TODO, UPDATE_TODO, DELETE_TODO } from './../constants/index';
export const todos = handleActions({
    [FETCH_TODOS]: (state, action) => {console.log(action); return action.payload.data ? [...action.payload.data] : action.payload},
    [INSERT_TODO]: (state, action) => [...state , action.payload.data],
    [UPDATE_TODO]: (state, action) => [],
    [DELETE_TODO] : (state, action) => state.filter(c => c.id !== action.payload) 
}, []);
