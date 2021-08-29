import {Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {  UserService } from 'src/app/services';
import { NewStandComponent } from '../../new-stand/new-stand.component';

@Component({
  selector: 'app-avaliable-stands',
  templateUrl: './avaliable-stands.component.html',
  styleUrls: ['./avaliable-stands.component.css']
})
export class AvaliableStandsComponent implements OnInit {

  displayedColumns : string[] = ['index','standNumber', 'area', 'cost','status'];
  dataSource = new MatTableDataSource()
  dataSource2 = new MatTableDataSource()
  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;
  @ViewChild('tabGroup') tabGroup;
  checkTab:number;


  constructor( public dialog : MatDialog, private router : Router, private getStands: UserService) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadStands();

  }



  newStand(): void {
    const dialogRef = this.dialog.open( NewStandComponent , {
      width: '800px',
      height:'400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadStands();
    });
  }

  public loadStands() {

    this.isLoading = true;
      this.getStands.getActiveUsers().subscribe((resp:any) => {
        console.log(resp)

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




  tabChanged(e){

     this.checkTab == e.index;


  }


}
