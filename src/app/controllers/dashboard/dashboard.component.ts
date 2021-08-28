import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private getDashboard: UserService){}
  public totals:any;
  public stands:any;
  ngOnInit() {
    this.totalElements();
    this.standsStatistics();

   }

   totalElements(){
    this.getDashboard.getAllUsers().subscribe((res:any)=>{
      console.log(res)
      this.totals= res;
    })
   }

   standsStatistics(){
    this.getDashboard.getActiveUsers().subscribe((res:any)=>{
      console.log(res)
      this.stands= res;
    })
   }


	 // Number of cards to be generated with congAfterViewInit() { }lumn and rows to be covered
  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];
}
