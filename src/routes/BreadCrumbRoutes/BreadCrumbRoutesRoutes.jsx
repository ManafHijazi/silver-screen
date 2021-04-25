import { HomeRoutes, FormBuilderRoutes, ContactsCrmRoutes } from '../HomeRoutes';

export const BreadCrumbRoutes = [...HomeRoutes, ...FormBuilderRoutes, ...ContactsCrmRoutes];
