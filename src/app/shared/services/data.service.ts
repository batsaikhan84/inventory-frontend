import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs'
import { IExtraction } from '../models/extraction.model';
import { IUser } from '../models/user.model';
import { ExtractionService } from './extraction.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  helper = new JwtHelperService();
  private extractionMaster = new BehaviorSubject<any>(undefined)
  currentItem = this.extractionMaster.asObservable();
  private errorMessage = new BehaviorSubject<string>('')
  currentMessage = this.errorMessage.asObservable();
  private user = new BehaviorSubject<IUser>({
    username: '',
    name: '',
    department: '',
    role: '',
    exp: 0,
    iat: 0
  })
  currentUser = this.user.asObservable();

  constructor(private extractionService: ExtractionService) { }
  ngOnInit() {
    this.getUser()
  }
  updateCurrentItem(extractionMasterItem: IExtraction[]) {
    this.extractionMaster.next(extractionMasterItem)
  }
  loginErrorMessage(message: string) {
    this.errorMessage.next(message)
  }
  getUser() {
    const token: string = localStorage.getItem('token') || ''
    if(token) {
      const decodedToken = this.helper.decodeToken(token)
      this.updateUser(decodedToken)
      return decodedToken
    }
  }
  updateUser(user: IUser) {
    this.user.next({
      username: user.username,
      name: user.name,
      department: user.department,
      role: user.role,
      exp: user.exp,
      iat: user.iat
    })
  }
}
