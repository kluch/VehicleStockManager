import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CarComponent} from './car.component';
import {DashboardComponent} from './dashboard.component';
import {CarDetailComponent} from './car-detail.component';
import {CarSearchComponent} from './car-search.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'cars',
        component: CarComponent
    },
    {
        path: 'detail/:id',
        component: CarDetailComponent 
    },
    {
        path: 'search',
        component: CarSearchComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);