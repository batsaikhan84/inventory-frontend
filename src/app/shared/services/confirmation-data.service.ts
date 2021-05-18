import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpecialRequest } from '../models/special-request.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDataService {
  private cofirmationItems = new BehaviorSubject<any>(undefined)
  currentConfirmationItems = this.cofirmationItems.asObservable()
  constructor() { }
  updateCofirmationItems(cofirmationItems: ISpecialRequest) {
    this.cofirmationItems.next(cofirmationItems)
  }
}
