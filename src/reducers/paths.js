import { handleActions } from 'redux-actions';
import { PUBLIC_PATH_PRODUCTS } from '../constants/index';

export const paths = handleActions({
    [PUBLIC_PATH_PRODUCTS]: (state, action) => {
        state.PUBLIC_PATH_PRODUCTS= action.payload.data;
        return state;
    },
}, {});
