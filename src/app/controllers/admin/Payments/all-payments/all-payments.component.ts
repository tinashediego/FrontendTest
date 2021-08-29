import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.scss']
})
export class AllPaymentsComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  public id:any;
  public stands:any;
  public paymentTypes:any;
  public createdBy:any;
  ready: boolean =false;
  public reference: any;
  date = new Date()
//  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private viewPayment: PaymentService,private router : Router,private route: ActivatedRoute) {}

	ngOnInit() {
  }

}

