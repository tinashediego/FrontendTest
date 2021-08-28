import { Component, OnInit, Inject, ComponentFactoryResolver } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, ClientService, PaymentService, StandService } from '../../../../services';
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

  constructor(private addNewPayment: PaymentService, private alerts: AlertService,
    private router : Router, public dialogRef: MatDialogRef<NewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private getStands: StandService, private getClients: ClientService) {}

	ngOnInit() {
    this.getAllPaymentTypes();
    this.getClients.getClients().subscribe((res:any)=>{
    this.clients = res;
    },err=>{
      console.log(err)
    })

    this.paymentForm.value();

    if(!this.paymentForm.valid){
      this.isDisabled=true;
    }


  }


  getAllPaymentTypes(){
    this.addNewPayment.getPaymentTypes().subscribe((res:any)=>{
      this.payments = res;
      console.log(res)
    },error=>{
      console.log(error)
    })
  }

   //in your ts
   onChangeTown(event): void {
    this.id = event;
    sessionStorage.setItem('clientId',this.id);
    console.log('selectedTown: ', this.id);

    let x = sessionStorage.getItem("clientId");
    console.log(x)
    this.getClients.getClientStands(x).subscribe((res:any)=>{
    this.stands = res.stands;
    console.log(this.stands)
    },error=>{
      console.log(error)
    })

  }



  submit(){
    if(!this.paymentForm.valid){
      this.alerts.error("Please fill all fields provided");
    }else{

        this.loading = true;
        this.addNewPayment.register(this.paymentForm.value).subscribe(res=>{
          this.alerts.success(" Payment successful");
          this.isDisabled=true;

        },(error:any)=>{
          this.loading = false;
          this.alerts.error(error);
          this.isDisabled=false;
        })

    }
  }


closeDialog(){
  this.dialogRef.close();
}
}

