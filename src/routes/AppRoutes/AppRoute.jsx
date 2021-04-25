import { AccountLayout, HomeLayout } from '../../Layouts';
import { NotFoundLayout } from '../../Layouts/NotFoundLayout/NotFoundLayout';

export const AppRoutes = [
  {
    path: '/account',
    name: 'Account',
    component: AccountLayout,
    layout: '',
    default: true,
    authorize: false,
    roles: [],
    showInMenu: false,
    isRoute: true,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeLayout,
    layout: '',
    default: false,
    authorize: true,
    roles: [],
    showInMenu: false,
    isRoute: true,
  },
  {
    path: '/error',
    name: 'Error',
    component: NotFoundLayout,
    layout: '',
    default: false,
    authorize: false,
    roles: [],
    showInMenu: false,
    isRoute: true,
  },
];
