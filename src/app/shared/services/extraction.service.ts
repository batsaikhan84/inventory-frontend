import { IMaster } from 'src/app/shared/models/master.model';
import { map } from 'rxjs/operators';
import { IExtraction } from './../models/extraction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractionService {
  baseExtractionUrl = 'http://localhost:3000/extraction'
  baseMasterUrl = 'http://localhost:3000/master'
  constructor(private _http: HttpClient) { }
  getExtractionItems() {
    return this._http.get<IMaster[]>(this.baseExtractionUrl)
  }
  getExtractionMasterItems() {
    return this._http.get<IExtraction[]>(`${this.baseExtractionUrl}/master`)
  }
  getExtractionMasterItem(id: number) {
    return this._http.get<IExtraction>(`${this.baseExtractionUrl}/master/${id}`)
  }
  getExtractionItemsOfMaster(id: number) {
    return this._http.get<IExtraction>(`${this.baseMasterUrl}/${id}/extraction`)
  }
  updateExtractionItem(id: number, data: IExtraction) {
    return this._http.patch<IExtraction>(`${this.baseExtractionUrl}/${id}`, data)
  }
}
