import { createSelector } from 'reselect';

export const getCategories = state => state.categories;

export const getCategoryById = createSelector(
    (state, props) => state.categories.find( c => c.id === parseInt(props.id)),
    category => category
);