import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  buttonText = 'Forgot Password?'
  isForgotPassword = false
  loginErrorMessage: string = ''
  constructor(private authService: AuthService, private _router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  getErrorMessage() {
    return 'This field is required';
  }
  buttonTextToggle() {
    if(this.isForgotPassword === true) {
      this.isForgotPassword = false
      this.buttonText = 'Forgot Password?'
      this.loginErrorMessage = ''
    } else {
      this.isForgotPassword = true
      this.buttonText = 'Sign In'
      this.loginErrorMessage = ''
    }
  }
}
