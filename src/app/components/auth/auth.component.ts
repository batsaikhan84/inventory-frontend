import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginErrorMessage: string = ''
  hide = true;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('' , [Validators.required]),
  })
  constructor(private authService: AuthService, private _router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  onSubmit = () => {
    this.authService.signin(this.form.value)
  }
  getErrorMessage() {
    return 'This field is required';
  }

}
