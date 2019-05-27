import { INSERT_PRODUCT , FETCH_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from "../constants";
import { createAction } from 'redux-actions';
import { apiGet, apiDelete, apiPostFormData, apiPutFormData} from "../api";
import { urlProducts } from "../api/urls";


export const insertProduct = createAction(INSERT_PRODUCT,
    (product) => apiPostFormData(urlProducts, product)() );

export const fetchProducts = createAction(FETCH_PRODUCTS,
    apiGet(urlProducts));

export const updateProduct = createAction(UPDATE_PRODUCT,
    (id,product) => apiPutFormData(urlProducts, id, product)() );

export const deleteProduct = createAction(DELETE_PRODUCT,
    (id) => apiDelete(urlProducts, id)() );
