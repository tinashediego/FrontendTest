import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminRoutes } from '../admin/admin.routing';
import { StandListComponent } from './Stands/stand-list/stand-list.component';
import { UiModule } from 'src/app/ui-components/ui.module';
import { ClientListComponent } from './Clients/client-list/client-list.component';
import { NewClientComponent } from './Clients/new-client/new-client.component';
import { AssignStandComponent } from './Clients/assign-stand/assign-stand.component';
import { ViewClientComponent } from './Clients/view-client/view-client.component';
import { ViewStandComponent } from './Stands/view-stand/view-stand.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { NewUserComponent } from './Users/new-user/new-user.component';
import { NewStandComponent } from './Stands/new-stand/new-stand.component';
import { SoldStandsComponent } from './Stands/stand-list/sold-stands/sold-stands.component';
import { AvaliableStandsComponent } from './Stands/stand-list/avaliable-stands/avaliable-stands.component';
import { StandPaymentComponent } from './Stands/stand-list/stand-payment/stand-payment.component';
import { PaymentListComponent } from './Payments/payment-list/payment-list.component';
import { NewPaymentComponent } from './Payments/new-payment/new-payment.component';
import { AllPaymentsComponent } from './Payments/all-payments/all-payments.component';
import { ViewPaymentComponent } from './Payments/view-payment/view-payment.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    UiModule
  ],
  providers: [],
  declarations: [
    StandListComponent,
    PaymentListComponent,
    NewClientComponent,
    NewPaymentComponent,
    AllPaymentsComponent,
    ViewPaymentComponent,
    ClientListComponent,
    UserListComponent,
    NewUserComponent,
    NewStandComponent,
    ViewClientComponent,
    ViewStandComponent,
    AssignStandComponent,
    SoldStandsComponent,
    AvaliableStandsComponent,
    StandPaymentComponent
  ],
  exports:[
    StandListComponent,
    UserListComponent,
    ClientListComponent,
    PaymentListComponent,
    SoldStandsComponent,
    AvaliableStandsComponent
    ]
})
export class AdminsModule {}
