import { HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { Groups, Users } from '../models';
import {ApisService} from './apis.service'
@Injectable({providedIn: 'root'})
export class UserService {

    url:any;

    constructor(private apis : ApisService) {}

  post(user:any) : Observable < Users > {
    return this.apis.post(`/v1/users`, user)
  }

  getUsers() : Observable < Users > {
    return this.apis.get(`/v1/users`)
  }


  findAll(page: number, size: number) {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.apis.get('/v1/my-users', params).pipe(
      map((userData:any) => userData),
      catchError(err => throwError(err))
    )
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

  getOneUser(userId:string) : Observable < Users > {
    return this.apis.get(`/v1/user/${userId}`)
  }

  updateUserStatus(user:Users, enabled:boolean) : Observable < Users > {
    return this.apis.patch(`/v1/my-users/${user.id}?active=${enabled}`)
  }

  changeUserGroup(userId:string,group:Groups) : Observable < Users > {
    return this.apis.patch(`/v1/${userId}/change-user-group`,group)
  }

  deleteUser(userId:string) : Observable < Users >{
    return this.apis.delete(`/v1/my-users/${userId}`)
  }

  putUser(user:Users){
    return this.apis.put(`/v1/my-users/${user.id}`,user)
  }

  forgotPassword(user:Users) : Observable < Users >{
    return this.apis.post(`/v1/forgot-password`,user)
  }

  getUserPermission(userId:string) : Observable < Users >{
    return this.apis.get(`/v1/user/${userId}/permissions`)
  }

  revokePermission(){
    return this.apis.patch(`/v1/user-permissions/revoke`)
  }
  getUnassginedPermissions(userId){

    return this.apis.get(`/v1/user-permissions/unassigned/${userId}`)

  }


  getAssgiendPermissions(userId){

    return this.apis.get(`/v1/user/${userId}/permissions/all`)

  }



  assignPem(userID ,pemid){

     return this.apis.post(`/v1/user-permissions?permissionId=${pemid}&userId=${userID}`,{})
  }



   revokeIt(permId){


   return this.apis.post(`/v1/user-permissions/revoke?userPermissionId=${permId}`,{})
   }
}
