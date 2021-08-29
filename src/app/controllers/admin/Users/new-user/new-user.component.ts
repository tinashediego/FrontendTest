import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../../../../services';

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

  userForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  });

  constructor(private register: UserService, private alerts: AlertService,private router : Router) {}

	ngOnInit() {

  }

 createUserForm() {
    this.loading = true;
    this.register.post(this.userForm.value).subscribe(res=>{
      this.alerts.success("User registration successful");
      return this.router.navigate(['/user']);

    },(error:any)=>{
      this.loading = false;
      this.alerts.error(error)
    })


}
}

