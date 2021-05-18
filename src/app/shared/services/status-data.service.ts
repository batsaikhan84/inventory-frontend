import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpecialRequest } from '../models/special-request.model';

@Injectable({
  providedIn: 'root'
})
export class StatusDataService {
  private statusItems = new BehaviorSubject<any>(undefined)
  currentStatusItems = this.statusItems.asObservable()
  constructor() { }
  updateCofirmationItems(cofirmationItems: ISpecialRequest) {
    this.statusItems.next(cofirmationItems)
  }
}
