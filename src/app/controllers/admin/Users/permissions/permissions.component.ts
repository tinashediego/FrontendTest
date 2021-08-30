import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService, UserService } from 'src/app/services';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  pemGroup:any =[]
  needRevoke:any =[]
  ready:boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialog : MatDialog, private userService:UserService ,private  alertService:AlertService) { }

  ngOnInit() {

    this.gethemAll();


  }



  gethemAll(){

    this.userService.getAssgiendPermissions(this.data.id).subscribe((resp:any)=>{

      console.log(resp)

      this.needRevoke = resp.sort()
   });

    this.userService.getUnassginedPermissions(this.data.id).subscribe((resps:any)=>{

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
  this.userService.assignPem(this.data.id ,x).subscribe(resp=>{
    this.gethemAll();
  },err=>{
    console.log(err.error)

           this.alertService.error(err.error.error ||err.error.message)

        })
  }

}


