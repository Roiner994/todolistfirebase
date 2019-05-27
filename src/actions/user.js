import { INSERT_USER , FETCH_USERS, UPDATE_USER, DELETE_USER } from "../constants";
import { createAction } from 'redux-actions';
import { apiPost, apiGet, apiPut, apiDelete} from "../api";
import { urlUsers } from "../api/urls";


export const insertUser = createAction(INSERT_USER,
    (user) => apiPost(urlUsers, user)() );

export const fetchUsers = createAction(FETCH_USERS,
    apiGet(urlUsers));

export const updateUser = createAction(UPDATE_USER,
    (id,user) => apiPut(urlUsers, id, user)() );

export const deleteUser = createAction(DELETE_USER,
    (id) => apiDelete(urlUsers, id)() );
