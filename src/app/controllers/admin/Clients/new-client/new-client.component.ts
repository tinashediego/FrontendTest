import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, ClientService } from '../../../../services';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isDisabled:boolean=false;
  clientForm: FormGroup;

  constructor(private addNewClient: ClientService, private alerts: AlertService,
    private router : Router, public dialogRef: MatDialogRef<NewClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

	ngOnInit() {
    this.createClient();
  }

  createClient(){
    this.clientForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      nationalId: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });
  }

  submit(){
    if(!this.clientForm.valid){
      this.alerts.error("Please fill all fields provided");
    }else{

        this.loading = true;
        this.addNewClient.addNewClient(this.clientForm.value).subscribe(res=>{
          this.alerts.success("Client registration successful");
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

