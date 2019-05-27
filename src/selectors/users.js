import { createSelector } from 'reselect';

export const getUsers = state => state.users;

export const getUserById = createSelector(
    (state, props) => state.users.find( c => c.id === parseInt(props.id)),
    user => user
);