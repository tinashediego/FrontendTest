import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';
import { ChartistModule } from 'ng-chartist';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ChartistModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
