import { handleActions } from 'redux-actions';
import { FETCH_CATEGORIES, INSERT_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './../constants/index';
export const categories = handleActions({
    [FETCH_CATEGORIES]: (state, action) => action.payload.data ? [...action.payload.data] : action.payload,
    [INSERT_CATEGORY]: (state, action) => [...state , action.payload.data],
    [UPDATE_CATEGORY]: (state, action) => {
        if(action.error)
            return state;
        
        const categoryPayload = action.payload;
        const {id} = categoryPayload;
        const categories = state;
        const initialValue = [];
        const newCategory = categories.reduce( (acc, newCategory) => {
            if (newCategory.id === id){
                return [ ...acc, categoryPayload];
            }else{
                return [ ...acc, newCategory];
            }
        }, initialValue );
        return newCategory;
    },
    [DELETE_CATEGORY] : (state, action) => action.payload.success ? 
                                        state.filter(c => c.id !== action.payload.data.id) 
                                        : state
}, []);
