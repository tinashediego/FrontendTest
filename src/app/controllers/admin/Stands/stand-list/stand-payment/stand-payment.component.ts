import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-stand-payment',
  templateUrl: './stand-payment.component.html',
  styleUrls: ['./stand-payment.component.css']
})
export class StandPaymentComponent implements OnInit {

  displayedColumns : string[] = ['index','standNumber', 'area', 'cost'];
  dataSource = new MatTableDataSource()

  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;
  @ViewChild('tabGroup') tabGroup;
  checkTab:number;
  public results:any=[];
  public payments:any;
  public stands:any;
  constructor( public dialog : MatDialog, private getPayment: PaymentService,public dialogRef: MatDialogRef<StandPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    
    this.loadStandPayments();

  }



  public loadStandPayments() {

    this.isLoading = true;


    this.getPayment.getPaymentStand(this.data.id).subscribe((resp:any) => {
      this.results.push(resp.result)
      this.stands = this.results.stand
    console.log(this.results)
            if(this.results.length > 0){
              this.dataSource = new MatTableDataSource(this.results.reverse());
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
