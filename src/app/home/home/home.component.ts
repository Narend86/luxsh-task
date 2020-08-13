import { Component, OnInit,OnDestroy } from '@angular/core';
import {AuthenticationService} from '../../_service/authentication.service';
import {UserService} from '../../_service/user.service';
import { User } from '../../_model/user';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import { DialoBoxComponent } from '../../dialog-box/dialo-box/dialo-box.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SiteElement} from '../../_model/sitesData';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  ELEMENT_DATA:SiteElement[];
  currentUser: User;
  getallSite:any;
  currentUserSubscription: Subscription;
  displayedColumns: string[] = ['Site_Id', 
                                'Company_Id', 
                                'Site_Code', 
                                'Site_Name',
                                'Address1','Address2','Address3','Address4',
                                'PostCode','City','State','Country','Active','AddedBy','action'];
  dataSource = new MatTableDataSource<SiteElement>(this.ELEMENT_DATA);
  users: User[] = [];
  constructor( public dialog: MatDialog,private _snackBar: MatSnackBar, private authenticationService: AuthenticationService,private userService: UserService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
  });
   }

  ngOnInit(): void {
    this.loadAllUsers();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}
addSite(){
  const dialogRef = this.dialog.open(DialoBoxComponent, {
    width:'750px',
    height:'auto',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if(result ==='false' || result === undefined){
      return;
    }else{
      this.userService.createSite(result).subscribe(res =>{
        if(res.message ==='success'){
          this.loadAllUsers();
          let data = res.Site_Inserted;
          this._snackBar.open(data, 'Dismiss', {
            duration: 2000,
          });
        }
      })
    }
  });
  //  this.userService.createSite().subscribe
  }

  updateSite(data){
  let row={
    edit:true,
    site:data
  }
  const dialogRef = this.dialog.open(DialoBoxComponent, {
    width:'750px',
    height:'auto',
    data:row
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    if(result =='false'|| result ==undefined){
      return;
    }else{
      this.userService.updateSite(result).subscribe(res=>{
        if(res.message ==='success'){
          this.loadAllUsers();
          let data = res.Site_Inserted;
              this._snackBar.open(data, 'Dismiss', {
                duration: 2000,
              });
        }else{
          let data = res.message;
              this._snackBar.open(data, 'Dismiss', {
                duration: 2000,
              });
        }
      })
    }
 
   
  });

}
deleteSite(data){
  console.log(data)
  let Site_Id = data.Site_Id;
  this.userService.deleteSite(Site_Id).subscribe(result=>{
    console.log(result)
  })
  for(let i=0; i < this.dataSource.data.length;i++){
    if(data.Site_Id === this.dataSource.data[i].Site_Id){
      this.dataSource.data.splice(i,1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
      // break;
    }
  }
// console.log(ELEMENT_DATA)
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
loadAllUsers() {
    this.userService.getAllSite().pipe(first()).subscribe(result => {
     this.dataSource.data = result.site_list as SiteElement[];
  });

}
}
