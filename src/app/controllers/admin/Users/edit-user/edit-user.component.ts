import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/models';
import { UserService, AlertService, GroupService } from 'src/app/services';
import { EditGroupComponent } from '../../Groups/edit-group/edit-group.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isDisabled:boolean=false;
  groupForm: FormGroup;
  id:any;
  editGroup:Users;
  groups: any;


  constructor(private user: UserService, private alerts: AlertService,
    private router : Router, public dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private groupService:GroupService) {}

	ngOnInit() {


    console.log(this.data)
    this.user.getOneUser(this.data.id).subscribe((resp:Users)=>{
       console.log(resp);
       this.editGroup =resp
      this.createGroup(this.editGroup)
this.getGroups()
    })

  }

  createGroup(user:Users){
    this.groupForm = new FormGroup({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      initials: new FormControl(user.initials, Validators.required),
      email: new FormControl(user.email, Validators.required),
      username: new FormControl(user.username, Validators.required),
      phoneNumber: new FormControl(user.phoneNumber, Validators.required),
      groupId: new FormControl(user.groupId, Validators.required),
      portalClient: new FormControl(user.portalClient, Validators.required),
      id:new FormControl(user.id)
      });
  }

  submit(){
    if(!this.groupForm.valid){
      this.alerts.error("Please fill all fields provided");
    }else{

        this.loading = true;
        this.user.putUser(this.groupForm.value).subscribe(res=>{
          this.alerts.success("User update successful");
          this.isDisabled=true;
          this.groupForm.reset()
        },(error:any)=>{
          this.loading = false;
          this.alerts.error(error);
          this.isDisabled=false;
        })

    }
  }
  private getGroups(){


    this.groupService.getAllGroups().subscribe((resp:any)=>{
     this.groups =  resp

    });




 }


closeDialog(){
  this.dialogRef.close();
}
}
