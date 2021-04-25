import { ContactsView } from '../../Views/Home';

export const FormBuilderRoutes = [
  {
    id: 19,
    path: '/FormEdit',
    name: 'SideMenuView.FormBuilder',
    component: ContactsView,
    layout: '/home/FormBuilder',
    default: false,
    isRoute: true,
    authorize: true,
    roles: '',
    groupId: 1,
    order: 2,
    icon: 'icons i-box-circle-white',
    iconActive: 'icons i-box-circle-blue',
    isDisabled: false,
    showInMenu: false,
    isExact: true,
    breadcrumbs: [
      {
        name: 'SideMenuView.FormBuilder',
        isDisabled: false,
        route: '/home/FormBuilder/Form',
        groupName: 'system-admin',
      },
      {
        name: 'SideMenuView.FormBuilder',
        isDisabled: false,
        route: '/home/FormBuilder/FormEdit',
      },
    ],
  },
];
