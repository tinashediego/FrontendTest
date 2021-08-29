import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services';
import { NewUserComponent } from '../new-user/new-user.component';
import { AssignBulkPermissionsComponent } from '../../Groups/assign-bulk-permissions/assign-bulk-permissions.component';
import { AssignPermissionComponent } from '../../Groups/assign-permission/assign-permission.component';
import { EditGroupComponent } from '../../Groups/edit-group/edit-group.component';
import { NewGroupComponent } from '../../Groups/new-group/new-group.component';
import { RevokeBulkPermissionsComponent } from '../../Groups/revoke-bulk-permissions/revoke-bulk-permissions.component';
import { RevokePermissionComponent } from '../../Groups/revoke-permission/revoke-permission.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Users } from 'src/app/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  displayedColumns : string[] = ['index', 'firstName', 'lastName','initials','email','phoneNumber','username','updatedAt' ,'createdBy','action'];
  dataSource = new MatTableDataSource()
  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;


  constructor( public dialog : MatDialog, private router : Router, private getUsers: UserService) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadGroups()

  }


  newGroup(): void {
    const dialogRef = this.dialog.open( NewGroupComponent , {
      width: '800px',
      height:'600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
    });
  }

editGroup(x:String){
console.log(x)
    const dialogRef = this.dialog.open( EditUserComponent , {
      width: '800px',
      height:'400px',
      data: {x}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
    });
  }

  revokePermission(x:String){

    const dialogRef = this.dialog.open( RevokePermissionComponent , {
      width: '800px',
      height:'400px',
      data: {x}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
    });
  }

  revokeBulkPermissions(x:String){

    const dialogRef = this.dialog.open( RevokeBulkPermissionsComponent , {
      width: '800px',
      height:'400px',
      data: {x}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
    });
  }

  assignPermission(x:String){

    const dialogRef = this.dialog.open( AssignPermissionComponent , {
      width: '800px',
      height:'400px',
      data: {x}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
    });
  }

  assignBulkPermissions(x:String){

    const dialogRef = this.dialog.open( AssignBulkPermissionsComponent , {
      width: '800px',
      height:'400px',
      data: {x}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
    });
  }

  deleteGroup(x:string){
    this.getUsers.deleteUser(x).subscribe((res:any)=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
  }

  public loadGroups() {

    this.isLoading = true;
      this.getUsers.getUsers().subscribe((resp:any) => {
console.log(resp)
              if(resp.content.length > 0){
                this.dataSource = new MatTableDataSource(resp.content.reverse());
                this.dataSource.paginator = this.paginator;
                this.isLoading = false;
                  this.isData = false

              }else{
                this.isLoading = false
                this.isData = true


              }

        })

  }
}
