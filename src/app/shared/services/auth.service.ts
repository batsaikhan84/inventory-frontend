import { Router } from '@angular/router';
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
  private tokeExpirationTimer: any;
  message: string = ''
  helper = new JwtHelperService();
  constructor(private _http: HttpClient,
              private dataService: DataService,
              private _router: Router) { }
  ngOnInit() {
  }
  signin(user: IUser) {
    return this._http.post('http://localhost:3000/auth/signin', user).pipe(map((response: any) => {
      const decodedToken = this.helper.decodeToken(response.accessToken)
      localStorage.setItem('token', response.accessToken)
      const tokenExpirationDate = decodedToken.exp * 1000 - new Date().getTime()
      this.autoLogout(tokenExpirationDate)
      return decodedToken
    }))
  }
  signup(user: IUser) {
    this._http.post('http://localhost:3000/auth/signup', user).subscribe()
  }
  autoLogout(expirationDuration: number) {
    this.tokeExpirationTimer = setTimeout(()=> {
      this.logout();
    }, expirationDuration)
  }
  logout() {
    localStorage.removeItem('token')
    this._router.navigate([''])
    if(this.tokeExpirationTimer) {
      clearTimeout(this.tokeExpirationTimer)
    }
    this.tokeExpirationTimer = null
  }
  getCurrentUser() {
    const token: string = localStorage.getItem('token') || ''
    const currentUser = {
      username: '',
      name: '',
      department: '',
      role: '',
      exp: 0
    }
    if(token) {
      const decodedToken = this.helper.decodeToken(token)
      const currentUser = {
        username: decodedToken.username,
        name: decodedToken.name,
        department: decodedToken.department,
        role: decodedToken.role,
        exp: decodedToken.exp
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
