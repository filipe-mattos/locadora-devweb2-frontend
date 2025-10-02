import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./manager').then((m) => m.Manager)
  }
] as Routes