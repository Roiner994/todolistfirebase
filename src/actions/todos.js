import { INSERT_TODO , FETCH_TODOS, UPDATE_TODO, DELETE_TODO } from "../constants";
import { createAction } from 'redux-actions';
import { postFirebase, getFirebase, updateFirebase, deleteFirebase} from "../api";
// import { urlTodos } from "../api/urls";


export const insertTodo = createAction(INSERT_TODO,
    (todo) => postFirebase('todos',todo)() );

export const fetchTodos = createAction(FETCH_TODOS,
    getFirebase('todos'));

export const updateTodo = createAction(UPDATE_TODO,
    (id,todo) => {console.log(id); return updateFirebase('todos', id, todo)() });

export const deleteTodo = createAction(DELETE_TODO,
    (id) => deleteFirebase('todos', id)() );
