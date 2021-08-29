import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-stand.component.html',
  styleUrls: ['./view-stand.component.scss']
})
export class ViewStandComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  loading:boolean = false;
  public id:any;
  public details:any;

  constructor(private viewStand: UserService,private router : Router,private route: ActivatedRoute) {}

	ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.viewStand.getOneUser(`${this.id}`).subscribe(resp=>{

      this.details = resp;
      console.log(this.details);
    })
  }

}

