import NewUserContainer from "./containers/Panel/Users/NewUserContainer";
import UsersContainer from "./containers/Panel/Users/UsersContainer";
import Dashboard from "./containers/Panel/Dahsboard/Dashboard";
import UserContainer from "./containers/Panel/Users/UserContainer";
import CategoriesContainer from './containers/Panel/Categories/CategoriesContainer';
import NewCategoryContainer from './containers/Panel/Categories/NewCategoryContainer';
import CategoryContainer from './containers/Panel/Categories/CategoryContainer';
import ProductsContainer from "./containers/Panel/Products/ProductsContainer";
import NewProductContainer from "./containers/Panel/Products/NewProductContainer";
import ProductContainer from "./containers/Panel/Products/ProductContainer";
import TodosContainer from './containers/Panel/Todos/TodosContainer';
import NewTotoContainer from './containers/Panel/Todos/NewTodoContainer';
import TodoContainer from './containers/Panel/Todos/TodoContainer';
import { PREFIXPANEL } from "./constants";

const routesPanel = [
  // { path: '/', exact: true, name: 'Inicio' },
  { path: `${PREFIXPANEL}/dashboard`, exact: true, name: 'Dashboard', component: Dashboard},
  // User
  { path: `${PREFIXPANEL}/users`, exact: true, name: 'Lista de Usuarios', component: UsersContainer },
  { path: `${PREFIXPANEL}/users/new`, exact: true, name: 'Nuevo Usuario', component: NewUserContainer },
  { path: `${PREFIXPANEL}/users/:id/edit`, exact: true, name: 'Editar Usuario', component: UserContainer },
  // Categories
  { path: `${PREFIXPANEL}/categories`, exact: true, name: 'Lista de Categorias', component:  CategoriesContainer},
  { path: `${PREFIXPANEL}/categories/new`, exact: true, name: 'Nueva Categoria', component: NewCategoryContainer },
  { path: `${PREFIXPANEL}/categories/:id/edit`, exact: true, name: 'Editar Categoria', component: CategoryContainer },
  
  // Products
  { path: `${PREFIXPANEL}/products`, exact: true, name: 'Lista de Productos', component:  ProductsContainer},
  { path: `${PREFIXPANEL}/products/new`, exact: true, name: 'Nuevo Producto', component: NewProductContainer },
  { path: `${PREFIXPANEL}/products/:id/edit`, exact: true, name: 'Editar Producto', component: ProductContainer },

  { path: `${PREFIXPANEL}/todos`, exact: true, name: 'Lista de Tareas', component: TodosContainer },
  { path: `${PREFIXPANEL}/todos/new`, exact: true, name: 'Nueva Tarea', component: NewTotoContainer },
  { path: `${PREFIXPANEL}/todos/:id/edit`, exact: true, name: 'Editar Tarea', component: TodoContainer },
];

export default routesPanel;