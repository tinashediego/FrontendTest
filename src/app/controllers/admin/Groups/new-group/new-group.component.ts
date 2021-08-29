import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, GroupService,  } from '../../../../services';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isDisabled:boolean=false;
  groupForm: FormGroup;

  constructor(private addNewGroup: GroupService, private alerts: AlertService,
    private router : Router, public dialogRef: MatDialogRef<NewGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

	ngOnInit() {
    this.createGroup();
  }

  createGroup(){
    this.groupForm = new FormGroup({
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
      });
  }

  submit(){
    if(!this.groupForm.valid){
      this.alerts.error("Please fill all fields provided");
    }else{

        this.loading = true;
        this.addNewGroup.postGroup(this.groupForm.value).subscribe(res=>{
          this.alerts.success("Group registration successful");
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

