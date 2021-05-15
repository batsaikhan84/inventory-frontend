import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  message: string = ''
  helper = new JwtHelperService();
  constructor(private _http: HttpClient,
              private dataService: DataService) { }
  ngOnInit() {
  }
  signin(user: IUser) {
    this._http.post('http://localhost:3000/auth/signin', user).pipe(map((response: any) => {
      const decodedToken = this.helper.decodeToken(response.accessToken)
      localStorage.setItem('token', response.accessToken)
      return decodedToken
    })).subscribe({
      next: () => this.dataService.loginErrorMessage(''),
      error: (error) => {
        if(error.status === 400) {
          this.dataService.loginErrorMessage('There was a problem logging in. Please check your username and password.')
        }
      }
    })
  }
  signup(user: IUser) {
    this._http.post('http://localhost:3000/auth/signup', user).subscribe()
  }
  logout() {
    localStorage.removeItem('token')

  }
  getCurrentUser() {
    const token: string = localStorage.getItem('token') || ''
    const currentUser = {
      username: '',
      name: '',
      department: '',
      role: ''
    }
    if(token) {
      const decodedToken = this.helper.decodeToken(token)
      const currentUser = {
        username: decodedToken.username,
        name: decodedToken.name,
        department: decodedToken.department,
        role: decodedToken.role
      }
      return currentUser
    }
    return currentUser

  }
  isLoggedin(): boolean {
    const token: string = localStorage.getItem('token') || ''
    return !this.helper.isTokenExpired(token)
  }
}
