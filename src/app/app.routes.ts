import { Routes } from '@angular/router';
import { MainLayout } from './shared/main-layout/main-layout';
import { HomePage } from './home/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomePage },
    ]
  },
];