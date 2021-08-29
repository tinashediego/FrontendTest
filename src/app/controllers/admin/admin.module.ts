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
import { GroupListComponent } from './Groups/group-list/group-list.component';
import { AssignStandComponent } from './Groups/assign-stand/assign-stand.component';
import { ViewClientComponent } from './Groups/view-client/view-client.component';
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
import { EditGroupComponent } from './Groups/edit-group/edit-group.component';
import { NewGroupComponent } from './Groups/new-group/new-group.component';

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
    NewGroupComponent,
    NewPaymentComponent,
    AllPaymentsComponent,
    ViewPaymentComponent,
    GroupListComponent,
    UserListComponent,
    NewUserComponent,
    NewStandComponent,
    ViewClientComponent,
    ViewStandComponent,
    AssignStandComponent,
    SoldStandsComponent,
    AvaliableStandsComponent,
    StandPaymentComponent,
    EditGroupComponent
  ],
  exports:[
    StandListComponent,
    UserListComponent,
    GroupListComponent,
    PaymentListComponent,
    SoldStandsComponent,
    AvaliableStandsComponent,
    EditGroupComponent
    ]
})
export class AdminsModule {}
