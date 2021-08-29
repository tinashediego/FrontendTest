import { HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { from, Observable } from 'rxjs';
import {ApisService} from './apis.service'
@Injectable({providedIn: 'root'})
export class AuthService {

    url:any;

    constructor(private apis : ApisService , private oauth:OAuthService) {}

    Login(authObj){
      return from ( this.oauth.fetchTokenUsingPasswordFlow(authObj.username,authObj.password,
        new HttpHeaders({
            Authorization: `Basic Y2xpZW50OkR4Nmc1TXd5JHoyaG5AQGhTdWRFRVImUVJoeUY2OTBr`
        })
        ).catch((e) =>{
             throw new Error(e)
        })) as Observable<any> ;
   }
}
