import { ContactsView } from '../../Views/Home';

export const ContactsCrmRoutes = [
  {
    path: '/view',
    name: 'ContactsView:contacts',
    component: ContactsView,
    layout: '/home/Contacts',
    default: true,
    isRoute: true,
    authorize: true,
    roles: '',
    isDisabled: false,
    isExact: true,
    breadcrumbs: [
      {
        name: 'ContactsView:contacts',
        isDisabled: false,
        route: '/home/Contacts/view',
        groupName: 'crm',
      },
    ],
  },
];
