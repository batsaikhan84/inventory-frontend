import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  buttonText = 'Forgot Password?'
  isForgotPassword = false
  loginErrorMessage: string = ''
  passwordHide = true;
  confirmHide = true;
  resetPassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
    cofirm: new FormControl('' , [Validators.required]),
    username: new FormControl('', [Validators.required])
  })
  constructor(private authService: AuthService, private _router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  onSubmit = () => {
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next: () => {
          this.dataService.loginErrorMessage('')
          this._router.navigate(['/'])
      },
      error: (error) => {
        console.log(error.message)
        if(error.status === 401) {
          this.dataService.loginErrorMessage(error.error.message)
          return
        }
        if(error.status === 400) {
          this.dataService.loginErrorMessage(error.error.message)
          return
        }
        if(error.status === 409) {
          this.dataService.loginErrorMessage(error.error.message)
          return
        }       
      }
    })
  }
  getErrorMessage() {
    return 'This field is required';
  }
}
