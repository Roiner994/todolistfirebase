import { handleActions } from 'redux-actions';
// import { FETCH_CUSTOMERS, INSERT_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from './../constants/index';
import { FETCH_PRODUCTS, INSERT_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './../constants/index';
export const products = handleActions({
    [FETCH_PRODUCTS]: (state, action) => action.payload.data ? [...action.payload.data] : action.payload,
    [INSERT_PRODUCT]: (state, action) => [...state , action.payload.data],
    [UPDATE_PRODUCT]: (state, action) => {
        if(action.error)
            return state;
        
        const productPayload = action.payload;
        const {id} = productPayload;
        const products = state;
        const initialValue = [];
        const newProduct = products.reduce( (acc, newProduct) => {
            if (newProduct.id === id){
                return [ ...acc, productPayload];
            }else{
                return [ ...acc, newProduct];
            }
        }, initialValue );
        return newProduct;
    },
    [DELETE_PRODUCT] : (state, action) => action.payload.success ? 
                                        state.filter(c => c.id !== action.payload.data.id) 
                                        : state
}, []);
