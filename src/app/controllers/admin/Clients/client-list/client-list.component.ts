import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import { ClientService } from 'src/app/services';
import { AssignStandComponent } from '../assign-stand/assign-stand.component';
import { NewClientComponent } from '../new-client/new-client.component';
import { ViewClientComponent } from '../view-client/view-client.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  displayedColumns : string[] = ['index', 'firstname', 'lastname', 'email','phoneNumber','nationalId','updatedAt' ,'createdBy','action'];
  dataSource = new MatTableDataSource()
  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;


  constructor( public dialog : MatDialog, private router : Router, private getClient: ClientService) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadClients()

  }



  newClient(): void {
    const dialogRef = this.dialog.open( NewClientComponent , {
      width: '800px',
      height:'600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadClients();
    });
  }



  viewClient(id): void {
    const dialogRef = this.dialog.open( ViewClientComponent , {
      width: '1000px',
      height:'800px',
      data: {

        id:id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadClients();
    });
  }


  assignStand(x:String){

    const dialogRef = this.dialog.open( AssignStandComponent , {
      width: '800px',
      height:'400px',
      data: {x}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadClients();
    });
  }

  public loadClients() {

    this.isLoading = true;
      this.getClient.getClients().subscribe((resp:any) => {

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


/*
  downloadfifle(y) {

      this
          .answers
          .download(y)
          .subscribe(response=>{
                    console.log(response)
              const blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
              const url= window.URL.createObjectURL(blob);
              window.open(url);


          })

  }
*/
}
