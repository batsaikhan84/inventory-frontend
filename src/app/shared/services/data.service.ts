import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { IExtraction } from '../models/extraction.model';
import { ExtractionService } from './extraction.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private extractionMaster = new BehaviorSubject<any>(undefined)
  currentItem = this.extractionMaster.asObservable();
  private errorMessage = new BehaviorSubject<string>('')
  currentMessage = this.errorMessage.asObservable();

  constructor(private extractionService: ExtractionService) { }
  
  updateCurrentItem(extractionMasterItem: IExtraction[]) {
    this.extractionMaster.next(extractionMasterItem)
  }
  loginErrorMessage(message: string) {
    this.errorMessage.next(message)
  }
}
