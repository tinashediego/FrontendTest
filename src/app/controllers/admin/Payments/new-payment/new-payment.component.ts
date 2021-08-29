import { Component, OnInit, Inject, ComponentFactoryResolver } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { AlertService, ClientService, PaymentService, StandService } from '../../../../services';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss']
})
export class NewPaymentComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isDisabled:boolean=false;
  public stands:any;
  public clients:any;
  public payments:any;
  public id;
  n = new Date();
  randomNum = "Ref"+this.n.getMilliseconds()+Math.random().toString(36).substr(2, 9);

  paymentForm: FormGroup = new FormGroup({
    client: new FormControl('', Validators.required),
    stand: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    paymentType: new FormControl('', Validators.required),
    refenceNumber: new FormControl(this.randomNum, Validators.required)
  });


	ngOnInit() {
    this.getAllPaymentTypes();

    this.paymentForm.value();

    if(!this.paymentForm.valid){
      this.isDisabled=true;
    }


  }


  getAllPaymentTypes(){
  }

   //in your ts
   onChangeTown(event): void {

  }



  submit(){
  }


closeDialog(){
  //this.dialogRef.close();
}
}

