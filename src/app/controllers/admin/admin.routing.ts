import { Routes } from '@angular/router';
import { StandListComponent } from './Stands/stand-list/stand-list.component';
import { ClientListComponent } from './Clients/client-list/client-list.component';
import { ViewClientComponent } from './Clients/view-client/view-client.component';
import { ViewStandComponent } from './Stands/view-stand/view-stand.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { PaymentListComponent } from './Payments/payment-list/payment-list.component';

export const AdminRoutes: Routes = [
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'client',
    component:  ClientListComponent
  },
  {
    path: 'payment',
    component:  PaymentListComponent
  },
  {
    path: 'viewclient/:id',
    component:  ViewClientComponent
  },
  {
    path: 'viewstand/:id',
    component:  ViewStandComponent
  },
  {
    path: 'stand',
    component: StandListComponent
  }
];
