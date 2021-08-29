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
            .post(`v1/groups`, group)
    }

    getGroups() : Observable < Groups > {
      return this
          .apis
          .get(`v1/groups`)
  }

  getAllGroups() : Observable < Groups > {
    return this
        .apis
        .get(`v1/groups/all`)
}

  getOneGroup(groupId:String) : Observable < Groups > {
    return this
        .apis
        .get(`v1/group/${groupId}`)
}

putGroup(group:Groups){
  return this
      .apis
      .put(`v1/groups/${group.id}`,group)
}

deleteGroup(groupId:String){
  return this
      .apis
      .delete(`v1/group/${groupId}`)
}

getGroupPermission(groupId:String) : Observable < Groups >{
  return this.apis.get(`v1/group/${groupId}/permissions`)
}

revokePermission(group:Groups){
  return this.apis.patch(`v1/group-permissions/revoke`,group)
}

revokeBulkPermission(group:Groups){
  return this.apis.patch(`v1/group-permissions/revoke-bulk`,group)
}

}
