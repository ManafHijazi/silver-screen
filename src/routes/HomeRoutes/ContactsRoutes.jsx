import { ContactsView } from '../../Views/Home';

export const ContactsRoutes = [
  {
    path: '/view',
    name: 'ContactsView:contacts',
    component: ContactsView,
    layout: '/home/contacts',
    default: true,
    isRoute: true,
    authorize: true,
    roles: 'crm',
    isDisabled: false,
    isExact: true,
    breadcrumbs: [
      {
        name: 'ContactsView:contacts',
        isDisabled: false,
        route: '/home/contacts/view',
        groupName: 'call-center',
      },
    ],
  },
];
