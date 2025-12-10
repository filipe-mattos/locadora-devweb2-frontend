import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'manager/panel',
    loadChildren: () => import('./features/pages/manager/routes')
  },
  {
    path: '',
    redirectTo: '/manager/painel',
    pathMatch: 'full'
  }
];
