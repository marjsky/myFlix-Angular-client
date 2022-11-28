import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  user: any = localStorage.getItem('user');
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Fetch movies from API and return JSON file
   * @function getMovies
   * @returns movies array in object
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Fetch favorite movies from API and return JSON file
   * @function getFavorites
   * @returns array relates to IDs of favorite movies in object
   */

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      return this.favMovies;
    })
  }

  openProfileView(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  /**
   * Open director information 
   * @param {string} name
   * @param {string} bio
   * @param {date} birthday 
   * @function openDirectorDialog
   */
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday
      },
      width: '500px'
    });
  }

  /**
   * Open genre information 
   * @param {string} description
   * @param {string} name
   * @function openGenreDialog
   */
  openGenreDialog(description: string, name: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Description: description,
        Name: name
      },
      width: '500px'
    });
  }

  /**
   * Open synopsis information 
   * @param {string} title
   * @param {string} description
   * @function openSynopsisDialog
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    })
  }

  /**
   * Add movie to favorite movies list through API calls
   * @param {string} id
   * @function addToFavoriteMovies
   */
  addToFavoriteMovies(id: string): void{
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  /**
   * Remove movie from favorite movies list through API calls
   * @param {string} id
   * @function removeFromFavoriteMovies
   */
  removeFromFavoriteMovies(id: string): void{
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  /**
   * Check a movie is include user's favorite movies
   * @param {string} id
   * @function isFav
   * @returns boolean 
   */
  isFav(id: string): boolean {
    return this.favMovies.includes(id)
  }

}
