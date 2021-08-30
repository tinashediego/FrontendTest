import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'
import { Groups } from '../models';
import {ApisService} from './apis.service'
@Injectable({providedIn: 'root'})
export class GroupService {

    url:any;

    constructor(private apis : ApisService) {}

    postGroup(group:Groups) : Observable < Groups > {
        return this
            .apis
            .post(`/v1/groups`, group)
    }

    getGroups() : Observable < Groups > {
      return this
          .apis
          .get(`/v1/groups`)
  }

  getAllGroups() : Observable < Groups > {
    return this
        .apis
        .get(`/v1/groups/all`)
}

  getOneGroup(groupId:String) : Observable < Groups > {
    return this
        .apis
        .get(`/v1/group/${groupId}`)
}

putGroup(group:Groups){
  return this
      .apis
      .put(`/v1/groups/${group.id}`,group)
}

deleteGroup(groupId:String){
  return this
      .apis
      .delete(`/v1/group/${groupId}`)
}

getGroupPermission(userId:string) : Observable < Groups >{
  return this.apis.get(`/v1/group/${userId}/permissions`)
}

revokePermission(){
  return this.apis.patch(`/v1/group-permissions/revoke`)
}
getUnassginedPermissions(userId){

  return this.apis.get(`/v1/group-permissions/unassigned/${userId}`)

}


getAssgiendPermissions(userId){

  return this.apis.get(`/v1/group/${userId}/permissions/all`)

}



assignPem(userID ,pemid){

   return this.apis.post(`/v1/group-permissions?permissionId=${pemid}&groupId=${userID}`,{})
}



 revokeIt(permId){


 return this.apis.post(`/v1/group-permissions/revoke?groupPermissionId=${permId}`,{})
 }
}
