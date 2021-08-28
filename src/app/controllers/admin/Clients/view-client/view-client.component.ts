import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertService, ClientService } from '../../../../services';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  public id:any;
  public details:any=[];
  ready: boolean =false;
  acc:any;
  stands:any;
  date = new Date()
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private viewClient: ClientService,private router : Router,private route: ActivatedRoute) {}

	ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.viewClient.getClientStands(`${this.data.id}`).subscribe((resp:any)=>{

      console.log(resp)
      this.acc = resp.client;
      this.stands = resp.stands
      this.ready = true
    })
  }

}

