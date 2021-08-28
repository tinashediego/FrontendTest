import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
//import {AnswersService} from 'src/app/core/services';
@Component({
  selector: 'app-users-ui',
  templateUrl: './users-ui.component.html',
  styleUrls: ['./users-ui.component.scss']
})
export class UsersUiComponent {
  displayedColumns : string[] = ['index', 'name', 'published Date', 'fileName'];
  dataSource = new MatTableDataSource()
  users:any =[{"index":"index","name":"name","publish":"publisg","file":"file"}]
  @ViewChild(MatSort, {static: true})sort :any= MatSort;
  @ViewChild(MatPaginator, {static: true})paginator :any= MatPaginator;

  constructor( public dialog : MatDialog, private router : Router) {}

  applyFilter(filterValue : string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  ngOnInit() {
//
      this.loadSurvey()

  }

  newUser(){
    this.router.navigate(['/newuser'])
  }

  public loadSurvey() {

      //this
          //.answers
          //.getAllAnswersOf1Survey()
         // .subscribe(resp => {

              this.dataSource = new MatTableDataSource(this.users);
              this.dataSource.paginator = this.users.reverse() as any
              this.dataSource.paginator = this.paginator;
              //console.log(resp)

        //  })

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
