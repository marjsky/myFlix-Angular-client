import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  movies: any[] = [];
  favoriteMovies: any [] = [];
  birthday: any = '';

  @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  handleUpdate(): void {
    console.log('userData:');
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      console.log(resp);
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000
      });
      // Log out if user desire to update Username or Password.
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Pleae login again with your new credentials', 'OK', {
          duration: 2000
        });
      }
    })
  }
  
  deleteProfile(): void {
    if(confirm('Are you sure want to remove your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
    }
  }

}
