import { Routes } from '@angular/router';
import { AuthGuard } from './helper/auth-guard.service';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    loadChildren:
      () => import('./controllers/auth/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren:
          () => import('./controllers/admin/admin.module').then(m => m.AdminsModule)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./controllers/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
