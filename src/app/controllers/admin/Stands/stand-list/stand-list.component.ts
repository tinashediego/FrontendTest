import {Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-stand-list',
  templateUrl: './stand-list.component.html',
  styleUrls: ['./stand-list.component.scss']
})
export class StandListComponent {

  
  @ViewChild('tabGroup') tabGroup;
  checkTab:number;
 

  constructor() {}



  ngOnInit() {


  }





  tabChanged(e){

     this.checkTab == e.index;


  }


}
