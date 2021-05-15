import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignupFormComponent } from '../forms/signup-form/signup-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  department = ''
  constructor(public authService: AuthService, private router: Router, private dialog: MatDialog) {
  }
  ngOnInit(): void { 
    this.authService.getCurrentUser()
  }
  getDepartmentName() {
    if(this.authService.getCurrentUser().department === 'extraction') {
      return "EXTRACTION"
    }
    if(this.authService.getCurrentUser().department === 'massSpec') {
      return "MASS SPEC"
    }
    if(this.authService.getCurrentUser().department === 'receiving') {
      return "RECEIVING"
    }
    if(this.authService.getCurrentUser().department === 'rd') {
      return "R&D"
    }
    if(this.authService.getCurrentUser().department === 'screeining') {
      return "SCREENING"
    }
    if(this.authService.getCurrentUser().department === 'quality') {
      return "EXTRACTION"
    }
    if(this.authService.getCurrentUser().department === 'safety') {
      return "SAFETY"
    }
    return null
  }
  isAdmin(): boolean {
    return this.authService.getCurrentUser().role === "admin" ? true : false
  }
  isExtraction(): boolean {
    return this.authService.getCurrentUser().department === "extraction" ? true : false
  }
  isMassSpec(): boolean {
    return this.authService.getCurrentUser().department === "massSpec" ? true : false
  }
  isReceiving(): boolean {
    return this.authService.getCurrentUser().department=== "receiving" ? true : false
  }
  isScreening(): boolean {
    return this.authService.getCurrentUser().department === "screening" ? true : false
  }
  isRd(): boolean {
    return this.authService.getCurrentUser().department === "rd" ? true : false
  }
  isQuality(): boolean {
    return this.authService.getCurrentUser().department === "quality" ? true : false
  }
  isSafety(): boolean {
    return this.authService.getCurrentUser().department === "safety" ? true : false
  }
  isIt(): boolean {
    return this.authService.getCurrentUser().department === "it" ? true : false
  }
  handleLogout() {
    this.authService.logout()
    this.router.navigate([''])
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
}
