import { createSelector } from 'reselect';

export const getTodos = state => state.todos;

export const getTodoById = createSelector(
    (state, props) => state.todos.find( c => c.id === props.id),
    todo => todo
);