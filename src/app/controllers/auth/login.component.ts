import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService, AlertService } from 'src/app/services';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { inject } from '@angular/core/testing';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;

  loginForm: FormGroup
  constructor( private auth: AuthService, private alerts: AlertService,private router : Router) {}

	ngOnInit() {


    this.createLoginForm();

}

 createLoginForm() {

  this.loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
});



}



submitForm(){

  console.log('loading')


  this.loading = true;
  this.auth.Login(this.loginForm.value).subscribe((res:any)=>{

    console.log(res)
    //this.alerts.success("Login successful");
    sessionStorage.setItem('token',res.token);
    const decode:any = jwt_decode(res.token);
    //console.log(decode.username)
    sessionStorage.setItem('username',decode.username);
    return this.router.navigate(['/dashboard']);

  },(error:any)=>{
    this.loading = false;
    console.log(error)
    this.alerts.error(error?.error?.message)

  })

}
}
