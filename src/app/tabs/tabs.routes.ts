import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'calendar',
        loadComponent: () =>
          import('../calendar/calendar.page').then((m) => m.CalendarPage),
      },
      {
        path: 'timetable',
        loadComponent: () =>
          import('../timetable/timetable.page').then((m) => m.TimetablePage),
      },
      {
        path: 'assignments',
        loadComponent: () =>
          import('../assignments/assignments.page').then((m) => m.AssignmentsPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../register/register.page').then((m) => m.RegisterPage),
      },
      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/login',
    pathMatch: 'full',
  },
];
