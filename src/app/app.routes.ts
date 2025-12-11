import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {
        path:'',    
        component: HomePageComponent
    },
    {
        path:'detail',
        loadComponent: () => import('./detail-page/detail-page.component') 
    },
    {
        path:'cart',
        loadComponent: () => import('./cart/cart.component')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
