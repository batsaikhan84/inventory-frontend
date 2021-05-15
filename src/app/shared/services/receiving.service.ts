import { IReceiving } from './../models/receiving.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {
  baseExtractionUrl = 'http://localhost:3000/receiving'
  baseMasterUrl = 'http://localhost:3000/master'
  constructor(private _http: HttpClient) { }
  getReceivingItems() {
    return this._http.get<IReceiving[]>(this.baseExtractionUrl)
  }
  getReceivingMasterItems() {
    return this._http.get<IReceiving[]>(`${this.baseExtractionUrl}/master`)
  }
  getReceivingMasterItem(id: number) {
    return this._http.get<IReceiving>(`${this.baseExtractionUrl}/master/${id}`)
  }
  getReceivingItemsOfMaster(id: number) {
    return this._http.get<IReceiving>(`${this.baseMasterUrl}/${id}/receiving`)
  }
  updateReceivingItem(id: number, data: IReceiving) {
    return this._http.patch<IReceiving>(`${this.baseExtractionUrl}/${id}`, data)
  }
}