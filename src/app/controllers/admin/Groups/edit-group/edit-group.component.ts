import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, GroupService,  } from '../../../../services';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Groups } from 'src/app/models';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isDisabled:boolean=false;
  groupForm: FormGroup;
  id:any;
  editGroup:Groups;


  constructor(private group: GroupService, private alerts: AlertService,
    private router : Router, public dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

	ngOnInit() {


    console.log(this.data)
    this.group.getOneGroup(this.data.x).subscribe((resp:Groups)=>{
       console.log(resp);
       this.editGroup =resp
      this.createGroup(this.editGroup)

    })

  }

  createGroup(group:Groups){
    this.groupForm = new FormGroup({
      description: new FormControl(group.description, Validators.required),
      name: new FormControl(group.name, Validators.required),
      ownerUuid:new FormControl(group.ownerUuid),
      id:new FormControl(group.id)
      });
  }

  submit(){
    if(!this.groupForm.valid){
      this.alerts.error("Please fill all fields provided");
    }else{

        this.loading = true;
        this.group.putGroup(this.groupForm.value).subscribe(res=>{
          this.alerts.success("Group update successful");
          this.isDisabled=true;
          this.groupForm.reset()
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

