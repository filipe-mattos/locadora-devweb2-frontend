import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./manager.component').then((m) => m.Manager)
  },
  {
    path: 'actor',
    loadComponent: () => import('./components/modals/actor/actor.component').then((m) => m.Actor)
  },
  {
    path: 'director',
    loadComponent: () => import('./components/modals/director/director.component').then((m) => m.Director)
  },
  {
    path: 'class',
    loadComponent: () => import('./components/modals/class/class.component').then((m) => m.ClassComponent)
  },
  {
    path: 'item',
    loadComponent: () => import('./components/modals/item/item.component').then((m) => m.Item)
  },
  {
    path: 'titles',
    loadComponent: () => import('./components/modals/title/title.component').then((m) => m.Title)
  },
  {
    path: 'customer',
    loadComponent: () => import('./components/modals/customer/customer.component').then((m) => m.CustomerComponent)
  },
  {
    path: 'location',
    loadComponent: () => import('./components/modals/location-devolution/location-devolution.component').then((m) => m.LocatioDevolutionComponent)
  }
] as Routes
