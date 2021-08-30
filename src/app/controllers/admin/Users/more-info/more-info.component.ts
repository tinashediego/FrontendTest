import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from 'src/app/models';
import { AlertService, GroupService, UserService } from 'src/app/services';


@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  userForm: FormGroup;
  loading = false;
  submitted = false;
  disablesubmit = false;
  returnUrl: string;
  error = '';
  roles=[];
  groups=[];
  user:any
  ready:boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialog : MatDialog,private userServices:UserService , private alertServices:AlertService,  public snackBar: MatSnackBar , private groupService:GroupService ) { }



  ngOnInit() {
        this.getGroups()
        this.userServices.getOneUser(this.data.id).subscribe((resp)=>{
          this.user = resp;
        this.createUserForm(this.user);
          this.ready =  true;
        })


  }


  private getGroups (){


     this.groupService.getAllGroups().subscribe((resp:any)=>{
      this.groups =  resp

     });




  }






  createUserForm(user:Users){

    this.userForm = new FormGroup({
      firstName: new FormControl(user.firstName, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      email: new FormControl(user.email, [Validators.required]),
      phoneNumber:new FormControl(user.phoneNumber),
      initials: new FormControl(user.initials),
      username: new FormControl(user.username),

      id:new FormControl(user.id)

    });

  }

  get f() {
    return this.userForm.controls;
  }


  async onSubmit() {





  }

}
