import { Routes } from '@angular/router';
import {ApiServiceEnum} from './enums/api-enums';
import {ApiModels, getApiModel} from './models/api-models';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';

export const routes: Routes = [
  {
    path: getApiModel(ApiServiceEnum.DASHBOARD).appRoute,
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: getApiModel(ApiServiceEnum.HOME).appRoute
      },
      {
        path: getApiModel(ApiServiceEnum.HOME).appRoute,
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: getApiModel(ApiServiceEnum.COMPANIES).appRoute,
        loadComponent: () => import('./pages/companies/companies.component').then(c => c.CompaniesComponent),
      },
      {
        path: getApiModel(ApiServiceEnum.COMPANIES).subAppRoute,
        loadComponent: () => import('./pages/company/company.component').then(c => c.CompanyComponent),
      }
    ]
  },
  {
    path: getApiModel(ApiServiceEnum.LOGIN).appRoute,
    component: LoginComponent
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];
