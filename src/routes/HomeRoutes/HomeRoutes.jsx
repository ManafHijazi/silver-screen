import BusinessGroupsView from '../../Views/Home/Administration/BusinessGroupsView/BusinessGroups.View';
// import { ContactsCrmLayout } from '../../Layouts/Home/ContactsCrmLayout/ContactsCrmLayout';
import { DepartmentView } from '../../Views/Home/DepartmentView/Department.View';
import { ShiftView } from '../../Views/Home/ShiftView/Shift.View';
import { PayrollView } from '../../Views/Home/PayrollView/Payroll.View';
import { CoursesView } from '../../Views/Home/CoursesView/Courses.View';
import { AttendanceCheckInView } from '../../Views/Home';
import { TeamView } from '../../Views/Home/TeamView';

export const HomeRoutes = [
  {
    id: 1,
    path: '/contacts-view',
    name: 'ContactsView:contacts',
    component: PayrollView, // ContactsCrmLayout,
    layout: '/home',
    default: true,
    isRoute: true,
    authorize: true,
    roles: '',
    groupId: 1,
    order: 1,
    icon: 'mdi mdi-account-group-outline c-white',
    iconActive: 'mdi mdi-account-group-outline c-primary',
    isDisabled: false,
    showInMenu: true,
    isExact: false,
    breadcrumbs: [],
  },
  {
    id: 2,
    path: '/Administration/Organizational-chart',
    name: 'SideMenuView.Administration.BusinessGroups',
    component: BusinessGroupsView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: [],
    groupId: 2,
    order: 1,
    icon: 'mdi mdi-file-tree-outline',
    iconActive: 'mdi mdi-file-tree-outline c-primary',
    isDisabled: false,
    showInMenu: true,
    isExact: true,
    breadcrumbs: [
      {
        name: 'SideMenuView.Administration.BusinessGroups',
        isDisabled: false,
        route: '/home/Administration/Organizational-chart',
        groupName: 'system-admin',
      },
    ],
  },
  {
    id: 3,
    path: '/Administration/Team',
    name: 'SideMenuView.Administration.Team',
    component: TeamView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: [],
    groupId: 2,
    order: 2,
    icon: 'mdi mdi-account-outline c-white',
    iconActive: 'mdi mdi-account-outline c-blue-dark',
    isDisabled: false,
    showInMenu: true,
    isExact: false,
    breadcrumbs: [
      {
        name: 'SideMenuView.Administration.Team',
        isDisabled: false,
        route: '/home/Administration/Team',
        groupName: 'system-admin',
      },
    ],
  },
  {
    id: 4,
    path: '/Department',
    name: 'Department',
    component: DepartmentView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: [],
    groupId: 1,
    order: 2,
    icon: 'mdi mdi-desktop-mac-dashboard c-white',
    iconActive: 'mdi mdi-desktop-mac-dashboard c-blue-dark',
    isDisabled: false,
    showInMenu: true,
    isExact: false,
    breadcrumbs: [
      {
        name: 'Department',
        isDisabled: false,
        route: '/home/Administration/Department',
        groupName: 'system-admin',
      },
    ],
  },
  {
    id: 5,
    path: '/Shift',
    name: 'Shift',
    component: ShiftView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: [],
    groupId: 1,
    order: 3,
    icon: 'mdi mdi-timetable c-white',
    iconActive: 'mdi mdi-timetable c-blue-dark',
    isDisabled: false,
    showInMenu: true,
    isExact: false,
    breadcrumbs: [
      {
        name: 'Shift',
        isDisabled: false,
        route: '/home/Administration/Shift',
        groupName: 'system-admin',
      },
    ],
  },
  {
    id: 6,
    path: '/Payroll',
    name: 'Payroll',
    component: PayrollView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: [],
    groupId: 1,
    order: 4,
    icon: 'mdi mdi-card-account-details c-white',
    iconActive: 'mdi mdi-card-account-details c-blue-dark',
    isDisabled: false,
    showInMenu: true,
    isExact: false,
    breadcrumbs: [
      {
        name: 'Payroll',
        isDisabled: false,
        route: '/home/Administration/Payroll',
        groupName: 'system-admin',
      },
    ],
  },
  {
    id: 7,
    path: '/CoursesView',
    name: 'Courses',
    component: CoursesView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: [],
    groupId: 1,
    order: 5,
    icon: 'mdi mdi-nintendo-switch c-white',
    iconActive: 'mdi mdi-nintendo-switch c-blue-dark',
    isDisabled: false,
    showInMenu: true,
    isExact: false,
    breadcrumbs: [
      {
        name: 'Courses',
        isDisabled: false,
        route: '/home/Administration/Courses',
        groupName: 'system-admin',
      },
    ],
  },
  {
    id: 7,
    path: '/AttendanceCheckInView',
    name: 'attendance-check',
    component: AttendanceCheckInView,
    layout: '/home',
    default: false,
    isRoute: true,
    authorize: true,
    roles: [],
    groupId: 1,
    order: 5,
    icon: 'mdi mdi-google-circles-group c-white',
    iconActive: 'mdi mdi-google-circles-group c-blue-dark',
    isDisabled: false,
    showInMenu: true,
    isExact: false,
    breadcrumbs: [],
  },
];
