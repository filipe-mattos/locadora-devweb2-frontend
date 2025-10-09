import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./manager.component').then((m) => m.Manager)
  }
] as Routes
