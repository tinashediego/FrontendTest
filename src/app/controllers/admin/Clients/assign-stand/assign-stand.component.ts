import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService, StandService } from '../../../../services';

@Component({
  selector: 'app-assign-stand',
  templateUrl: './assign-stand.component.html',
  styleUrls: ['./assign-stand.component.scss']
})
export class AssignStandComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isLoading :Boolean =true;
  isData: Boolean = false;
  public stands:any=[];
  standForm: FormGroup = new FormGroup({

    standId: new FormControl('', Validators.required)
  });

  constructor(private assignStand: StandService,
  private getStands: StandService,private alerts: AlertService,
  private router: Router,public dialogRef: MatDialogRef<AssignStandComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any) {}

	ngOnInit() {

    this.getStands.getAvailableStands(false).subscribe((resp:any)=>{
      if(resp.length>0){
        this.stands=resp;
        this.isData=false;
        this.isLoading=false;
      }else{

        this.isData = true;
        this.isLoading=false;
      }
     },err=>{
       this.loading=false;
       console.log(err)
     })
  }

  assignStandForm() {

   this.loading = true;
    this.assignStand.assignStand(this.data.x,this.standForm.value).subscribe((res:any)=>{
      this.alerts.success("Stand assignment successful");

    },(error:any)=>{
      this.loading = false;
      console.log(error)
      this.alerts.error(error)
    })

}

closeDialog(){
  this.dialogRef.close();
}

}

