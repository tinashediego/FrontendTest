import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    const token = sessionStorage.getItem('token');

    if (token) {

    const token =  sessionStorage.getItem('token')

    if ( token){

      return true


    }else{

      sessionStorage.clear()
      this.router.navigate(['login']);
      return false;
    }


    } else {
      sessionStorage.clear()
      this.router.navigate(['login']);
      return false;
    }
  }
}
