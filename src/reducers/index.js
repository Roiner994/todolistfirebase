import { combineReducers } from 'redux';
import { users } from './users';
import { authentication } from './authentication';
import { categories } from './categories';
import { products } from './products';
import { paths } from './paths';
import { reducer as reduxForm } from "redux-form";
import { todos } from './todos';

export default combineReducers ({
    users,
    form: reduxForm,
    authentication,
    categories,
    products,
    paths,
    todos,
});