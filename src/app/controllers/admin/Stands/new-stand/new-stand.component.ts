import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../../../../services';

@Component({
  selector: 'app-new-stand',
  templateUrl: './new-stand.component.html',
  styleUrls: ['./new-stand.component.scss']
})
export class NewStandComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isDisabled:boolean =  false;

  standForm: FormGroup
  constructor(private register: UserService, private alerts: AlertService,private router : Router) {}

	ngOnInit() {


     this.createStandForm();

  }



   createStandForm(){

     this.standForm =  new FormGroup({
      standNumber: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });

   }

 submit() {



       if(!this.standForm.valid){


        this.alerts.success("Fill all fields");
       }else{


        this.loading = true;
        this.register.post(this.standForm.value).subscribe(res=>{
          this.alerts.success("Stand registration successful");
          this.router.navigate(['/stand']);

          this.loading = false;
          this.isDisabled = true;

        },(error:any)=>{
          this.loading = false;
          this.isDisabled =  false;
          this.alerts.error(error)
        })


      }





}
}

