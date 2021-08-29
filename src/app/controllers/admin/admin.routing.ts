import { Routes } from '@angular/router';
import { StandListComponent } from './Stands/stand-list/stand-list.component';
import { GroupListComponent } from './Groups/group-list/group-list.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { PaymentListComponent } from './Payments/payment-list/payment-list.component';

export const AdminRoutes: Routes = [
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'group',
    component:  GroupListComponent
  },
  {
    path: 'payment',
    component:  PaymentListComponent
  },
  {
    path: 'stand',
    component: StandListComponent
  }
];
