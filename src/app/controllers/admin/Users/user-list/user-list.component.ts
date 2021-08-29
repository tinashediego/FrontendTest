import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  displayedColumns : string[] = ['index', 'firstname', 'lastname', 'email','phoneNumber','address','city','nationalId','updatedAt' ,'createdBy'];
  dataSource = new MatTableDataSource()
  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;

  constructor( public dialog : MatDialog, private router : Router, private getClient: UserService) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadClients()
  }



  newUser(): void {
    const dialogRef = this.dialog.open( NewUserComponent , {
      width: '800px',
      height:'600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadClients();
    });
  }

  public loadClients() {

    this.isLoading = true;
      this.getClient.getActiveUsers().subscribe((resp:any) => {


              if(resp.length > 0){
                this.dataSource = new MatTableDataSource(resp.reverse());
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

