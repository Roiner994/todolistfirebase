import { INSERT_CATEGORY , FETCH_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY } from "../constants";
import { createAction } from 'redux-actions';
import { apiPost, apiGet, apiPut, apiDelete} from "../api";
import { urlCategories } from "../api/urls";

export const insertCategory = createAction(INSERT_CATEGORY,
    (category) => apiPost(urlCategories, category)() );

export const fetchCategories = createAction(FETCH_CATEGORIES,
    apiGet(urlCategories));

export const updateCategory = createAction(UPDATE_CATEGORY,
    (id,category) => apiPut(urlCategories, id, category)() );

export const deleteCategory = createAction(DELETE_CATEGORY,
    (id) => apiDelete(urlCategories, id)() );
