import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import { PaymentService } from 'src/app/services';
import { NewPaymentComponent } from '../new-payment/new-payment.component';
import { ViewPaymentComponent } from '../view-payment/view-payment.component';
import { AllPaymentsComponent } from '../all-payments/all-payments.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  displayedColumns : string[] = ['index', 'firstname', 'lastname', 'email','phoneNumber','nationalId','updatedAt' ,'createdBy','action'];
  dataSource = new MatTableDataSource()
  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;


  constructor( public dialog : MatDialog, private router : Router, private getPayment: PaymentService) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadPayments()

  }



  newPayment(): void {
    const dialogRef = this.dialog.open( NewPaymentComponent , {
      width: '800px',
      height:'600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadPayments();
    });
  }



  viewPayment(id): void {
    const dialogRef = this.dialog.open(ViewPaymentComponent , {
      width: '1000px',
      height:'800px',
      data: {

        id:id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadPayments();
    });
  }

  allPayments(id): void {
    const dialogRef = this.dialog.open(AllPaymentsComponent , {
      width: '1000px',
      height:'800px',
      data: {

        id:id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadPayments();
    });
  }


  public loadPayments() {

    this.isLoading = true;
      this.getPayment.getPayments().subscribe((resp:any) => {
        console.log(resp.content)
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
