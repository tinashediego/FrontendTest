import {Injectable} from '@angular/core';
import {ApisService} from './apis.service'
@Injectable({providedIn: 'root'})
export class AuthService {

    url:any;

    constructor(private apis : ApisService) {}

    Login(auth:any){
        return this
            .apis
            .post(`oauth/authorize`, auth)
    }

}
