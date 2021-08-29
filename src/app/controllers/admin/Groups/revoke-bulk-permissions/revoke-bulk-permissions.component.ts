import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GroupService, AlertService } from 'src/app/services';
import { RevokePermissionComponent } from '../revoke-permission/revoke-permission.component';

@Component({
  selector: 'app-revoke-bulk-permissions',
  templateUrl: './revoke-bulk-permissions.component.html',
  styleUrls: ['./revoke-bulk-permissions.component.css']
})
export class RevokeBulkPermissionsComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isLoading :Boolean =true;
  isData: Boolean = false;
  public groupPermissions:any;
  groupPermissionForm: FormGroup = new FormGroup({

    groupPermissionIds: new FormControl('', Validators.required)
  });

  constructor(
  private getPermissions: GroupService,private alerts: AlertService,
  private router: Router,public dialogRef: MatDialogRef<RevokePermissionComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any) {}

	ngOnInit() {
    this.loadPermissions()
      }

  revokeForm() {

   this.loading = true;
    this.getPermissions.revokeBulkPermission(this.groupPermissionForm.value).subscribe((res:any)=>{
      this.alerts.success("Permission revoked");

    },(error:any)=>{
      this.loading = false;
      console.log(error)
      this.alerts.error(error)
    })

}

loadPermissions(){
  this.getPermissions.getGroupPermission(this.data.x).subscribe((resp:any)=>{
    console.log(resp.content)
    if(resp.content.length>0){
      this.groupPermissions=resp.content;
      this.isData=false;
      this.isLoading=false;
    }else{

      this.isData = true;
      this.isLoading=false;
    }
   },err=>{
     this.loading=false;
     console.log(err)
   })

}

closeDialog(){
  this.dialogRef.close();
}

}

