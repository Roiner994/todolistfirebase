import { PREFIXPANEL } from "./constants";
export default {
    items: [
      {
        name: 'Dashboard',
        url: '/panel',
        icon: 'fa fa-cog',
      },
      {
        title: true,
        name: 'Menu',
        wrapper: {
          element: '',
          attributes: {},
        },
      },
      {
        name: 'Tareas',
        url: `${PREFIXPANEL}/todos`,
        icon: 'fa fa-puzzle-piece',
        children: [
          {
            name: 'Lista de tareas',
            url: `${PREFIXPANEL}/todos`,
            icon: 'fa fa-list',
          },
          {
            name: 'Nueva tarea',
            url: `${PREFIXPANEL}/todos/new`,
            icon: 'fa fa-plus',
          }
        ],
      }
      
    ],
  };
  