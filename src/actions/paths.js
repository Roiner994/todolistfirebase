import { PUBLIC_PATH_PRODUCTS } from "../constants";
import { createAction } from 'redux-actions';
import { apiGet } from "../api";
import { urlPathProducts } from "../api/urls";

export const fetchPathProducts = createAction(PUBLIC_PATH_PRODUCTS,
    apiGet(urlPathProducts));

