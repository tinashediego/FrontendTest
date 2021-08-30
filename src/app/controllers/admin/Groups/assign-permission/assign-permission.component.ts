import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GroupService, AlertService } from 'src/app/services';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.css']
})
export class AssignPermissionComponent implements OnInit {

  pemGroup:any =[]
  needRevoke:any =[]
  ready:boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialog : MatDialog, private userService:GroupService ,private  alertService:AlertService) { }

  ngOnInit() {

    this.gethemAll();


  }



  gethemAll(){

    this.userService.getAssgiendPermissions(this.data.x).subscribe((resp:any)=>{

      console.log(resp)

      this.needRevoke = resp.sort()
   });

    this.userService.getUnassginedPermissions(this.data.x).subscribe((resps:any)=>{

     this.pemGroup = resps.sort()

     console.log(resps)

     this.ready = true;
    })



  }

  RevokeSomePem(x){
    this.userService.revokeIt(x).subscribe(resp=>{

      this.gethemAll();
    },err=>{
console.log(err.error)

       this.alertService.error(err.error.error ||err.error.message )

    })

  }

  assignPem(x){
  this.userService.assignPem(this.data.x ,x).subscribe(resp=>{
    this.gethemAll();
  },err=>{
    console.log(err.error)

           this.alertService.error(err.error.error ||err.error.message)

        })
  }

}


