import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataService } from './data.service';
import { IForgotPassword } from '../models/reset-password.model';
import { SnackbarService } from './snackbar.service';
import { IUser } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;
  message: string = ''
  helper = new JwtHelperService();
  constructor(private _http: HttpClient,
              private dataService: DataService,
              private _router: Router,
              private _snackbarService: SnackbarService) { }

  signin(formValue: { username: string, password: string }) {
    return this._http.post('http://localhost:3000/auth/signin', formValue).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.accessToken)
        const decodedToken = this.helper.decodeToken(res.accessToken)
        if(decodedToken.role === 'admin') {
          this._router.navigate(['/admin/store-room'])
        } else {
          this._router.navigate(['/department/home'])
        }
        const tokenExpirationDate = decodedToken.exp * 1000 - new Date().getTime()
        this.autoLogout(tokenExpirationDate)
        this.dataService.loginErrorMessage('')
        return
      },
      error: () => {
        this.dataService.loginErrorMessage('There was a problem logging in. Please check your username and password.')
      }
    })
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
      this.logout();
    }, expirationDuration)
  }
  resetPassword(password: string) {
    return this._http.post('http://localhost:3000/auth/reset-password', password)
  }
  logout() {
    localStorage.removeItem('token')
    this._router.navigate([''])
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }
  getCurrentUser() {
    const token: string = localStorage.getItem('token') || ''
    if(token) {
      const decodedToken = this.helper.decodeToken(token)
      const currentUser: IUser = {
        username: decodedToken.username,
        name: decodedToken.name,
        department: decodedToken.department,
        role: decodedToken.role,
        exp: decodedToken.exp
      }
      return currentUser
    }
  }
  isLoggedin(): boolean {
    const token: string = localStorage.getItem('token') || ''
    return !this.helper.isTokenExpired(token)
  }
  signup(formValue: { 
    username: string,
    password: string,
    role: string,
    department: string,
    name: string
   }) {
    this._http.post('http://localhost:3000/auth/signup', formValue).subscribe({
      next: () => this._snackbarService.openSnackBar('User created successfully', 'success'),
      error: () => this._snackbarService.openSnackBar('User created unsuccessfully', 'error')
    })
  }
  forgotPassword(user: IForgotPassword) {
    return this._http.post('http://localhost:3000/forgot', user)
  }
}
