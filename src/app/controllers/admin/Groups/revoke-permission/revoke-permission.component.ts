import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService, GroupService, UserService } from '../../../../services';

@Component({
  selector: 'app-revoke-permission',
  templateUrl: './revoke-permission.component.html',
  styleUrls: ['./revoke-permission.component.scss']
})
export class RevokePermissionComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  isLoading :Boolean =true;
  isData: Boolean = false;
  public groupPermissions:any;
  groupPermissionForm: FormGroup = new FormGroup({

    groupPermissionId: new FormControl('', Validators.required)
  });

  constructor(
  private getPermissions: GroupService,private alerts: AlertService,
  private router: Router,public dialogRef: MatDialogRef<RevokePermissionComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any) {}

	ngOnInit() {
    this.loadPermissions()
      }

  revokeForm() {


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

