import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignupFormComponent } from '../forms/signup-form/signup-form.component';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: IUser
  constructor(public authService: AuthService,
              public dataService: DataService, 
              private dialog: MatDialog) {
  }
  ngOnInit(): void { 
    this.user = this.authService.getCurrentUser()
    console.log(this.user)
  }
  handleLogout() {
    this.authService.logout()
  }
  handleSignup() {
    this.openDialog()
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SignupFormComponent, dialogConfig)
  }
  isAdmin(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.role === "admin" ? true : false
  }
  isExtraction(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department === "extraction" ? true : false
  }
  isMassSpec(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department === "massSpec" ? true : false
  }
  isReceiving(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department=== "receiving" ? true : false
  }
  isScreening(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department === "screening" ? true : false
  }
  isRd(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department === "rd" ? true : false
  }
  isQuality(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department === "quality" ? true : false
  }
  isSafety(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department === "safety" ? true : false
  }
  isIt(): boolean {
    if(!this.user) {
      return null
    }
    return this.user.department === "it" ? true : false
  }
}
