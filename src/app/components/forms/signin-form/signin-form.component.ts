import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
  buttonText = 'Forgot Password?'
  isForgotPassword = false
  loginErrorMessage: string = ''
  hide = true;
  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('' , [Validators.required]),
  })
  constructor(private authService: AuthService, private _router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  onSubmit = () => {
    this.authService.signin(this.signInForm.value).subscribe({
      next: (data) => {
        if(data) {
          this.dataService.loginErrorMessage('')
          this.dataService.updateUser(data)
          if(data.role === 'admin') {
            this._router.navigate(['/admin/master'])
          } else {
            this._router.navigate(['/department/home'])
          }
          return
        }
        this.dataService.loginErrorMessage('There is a user already signed in ')
      },
      error: (error) => {
        if(error.status === 400 || error.status === 401 ) {
          this.dataService.loginErrorMessage('There was a problem logging in. Please check your username and password.')
        }
      }
    })
  }
  getErrorMessage() {
    return 'This field is required';
  }
}
