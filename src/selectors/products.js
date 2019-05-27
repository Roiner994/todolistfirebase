import { createSelector } from 'reselect';

export const getProducts = state => state.products;

export const getProductById = createSelector(
    (state, props) => state.products.find( c => c.id === parseInt(props.id)),
    product => product
);