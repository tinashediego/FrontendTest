import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService, GroupService, UserService } from '../../../../services';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  userForm:FormGroup;
  roles=[];
  groups=[];
  ready:boolean = false


  constructor(private register: UserService,private groupService:GroupService,
    public dialogRef: MatDialogRef<NewUserComponent>, private alerts: AlertService,private router : Router) {}

	ngOnInit() {
    this.createUserForm()
    this.getGroups()
  }

  createUserForm(){

    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      groupId: new FormControl('', [Validators.required]),
      ownerId: new FormControl('', [Validators.required]),
      phoneNumber:new FormControl(''),
      initials: new FormControl(''),
      username: new FormControl(''),
      portalClient:new FormControl('')

    });

  }

  get f() {
    return this.userForm.controls;
  }


 onSubmit() {
    this.loading = true;
    this.register.post(this.userForm.value).subscribe(res=>{
      this.alerts.success("User registration successful");
      return this.router.navigate(['/user']);

    },(error:any)=>{
      this.loading = false;
      this.alerts.error(error)
    })


}
private getGroups (){


  this.groupService.getAllGroups().subscribe((resp:any)=>{
   this.groups =  resp
   this.ready =  true
  })
}


closeDialog(){
  this.dialogRef.close();
}
}

