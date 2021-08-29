import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import { GroupService } from 'src/app/services';
import { AssignStandComponent } from '../assign-stand/assign-stand.component';
import { ViewClientComponent } from '../view-client/view-client.component';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { NewGroupComponent } from '../new-group/new-group.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  displayedColumns : string[] = ['index', 'description', 'name','updatedAt' ,'createdBy','action'];
  dataSource = new MatTableDataSource()
  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;
  isLoading :Boolean =true;
  isData :Boolean =false;


  constructor( public dialog : MatDialog, private router : Router, private getGroups: GroupService) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadGroups()

  }



  newGroup(): void {
    const dialogRef = this.dialog.open( NewGroupComponent , {
      width: '800px',
      height:'600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
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

      this.loadGroups();
    });
  }



editGroup(x:String){
console.log(x)
    const dialogRef = this.dialog.open( EditGroupComponent , {
      width: '800px',
      height:'400px',
      data: {x}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.loadGroups();
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

      this.loadGroups();
    });
  }


  deleteGroup(x:string){
    this.getGroups.deleteGroup(x).subscribe((res:any)=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
  }

  public loadGroups() {

    this.isLoading = true;
      this.getGroups.getGroups().subscribe((resp:any) => {
console.log(resp)
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
