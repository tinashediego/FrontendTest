import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import { StandService } from 'src/app/services';
import { NewStandComponent } from '../../new-stand/new-stand.component';
import {Component, OnInit, ViewChild } from '@angular/core';
import { StandPaymentComponent } from '../stand-payment/stand-payment.component';

@Component({
  selector: 'app-sold-stands',
  templateUrl: './sold-stands.component.html',
  styleUrls: ['./sold-stands.component.css']
})
export class SoldStandsComponent implements OnInit {
  displayedColumns : string[] = ['index','standNumber', 'area', 'cost','status','action'];
  dataSource = new MatTableDataSource()

  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;
  @ViewChild('tabGroup') tabGroup;
  checkTab:number;
 

  constructor( public dialog : MatDialog, private router : Router, private getStands: StandService) {}

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

  viewStand(id): void {
    const dialogRef = this.dialog.open( StandPaymentComponent , {
      width: '1000px',
      height:'800px',
      data: {

        id:id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadStands();
    });
  }

  public loadStands() {

    this.isLoading = true;


    this.getStands.getAvailableStands(true).subscribe((resp:any) => {
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
