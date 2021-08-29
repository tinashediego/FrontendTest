import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'
import { Groups, Users } from '../models';
import {ApisService} from './apis.service'
@Injectable({providedIn: 'root'})
export class UserService {

    url:any;

    constructor(private apis : ApisService) {}

  post(user:any) : Observable < Users > {
    return this.apis.post(`/v1/my-users`, user)
  }

  getUsers() : Observable < Users > {
    return this.apis.get(`/v1/my-users`)
  }

  getAllUsers() : Observable < Users > {
    return this.apis.get(`/v1/my-users/all`)
  }

  getActiveUsers() : Observable < Users > {
    return this.apis.get(`/v1/my-users/active`)
  }


  getNonActiveUsers() : Observable < Users > {
    return this.apis.get(`/v1/my-users/non-active`)
  }


  resendActivationEmail(user:Users) : Observable < Users > {
    return this.apis.post(`/v1/resend-activation-email`,user)
  }

  getOneUser(userId:String) : Observable < Users > {
    return this.apis.get(`/v1/user/${userId}`)
  }

  updateUserStatus(enabled:boolean,user:Users) : Observable < Users > {
    return this.apis.patch(`/v1/my-users/${user.id}?active=${enabled}`)
  }

  changeUserGroup(userId:String,group:Groups) : Observable < Users > {
    return this.apis.patch(`/v1/${userId}/change-user-group`,group)
  }

  deleteUser(userId:String) : Observable < Users >{
    return this.apis.delete(`/v1/my-users/${userId}`)
  }

  putUser(user:Users) : Observable < Users >{
    return this.apis.put(`/v1/my-users/${user.ownerId}`,user)
  }

  forgotPassword(user:Users) : Observable < Users >{
    return this.apis.post(`/v1/forgot-password`,user)
  }

  getUserPermission(userId:String) : Observable < Users >{
    return this.apis.get(`/v1/user/${userId}/permissions`)
  }

  revokePermission(group:Groups){
    return this.apis.patch(`/v1/user-permissions/revoke`,group)
  }

  revokeBulkPermission(group:Groups){
    return this.apis.patch(`/v1/user-permissions/revoke-bulk`,group)
  }

}
