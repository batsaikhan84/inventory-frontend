import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRd } from '../models/rd.model';

@Injectable({
  providedIn: 'root'
})
export class RdService {
  baseExtractionUrl = 'http://localhost:3000/rd'
  baseMasterUrl = 'http://localhost:3000/master'
  constructor(private _http: HttpClient) { }
  getRdItems() {
    return this._http.get<IRd[]>(this.baseExtractionUrl)
  }
  getRdMasterItems() {
    return this._http.get<IRd[]>(`${this.baseExtractionUrl}/master`)
  }
  getRdMasterItem(id: number) {
    return this._http.get<IRd>(`${this.baseExtractionUrl}/master/${id}`)
  }
  getRdItemsOfMaster(id: number) {
    return this._http.get<IRd>(`${this.baseMasterUrl}/${id}/rd`)
  }
  updateRdItem(id: number, data: IRd) {
    return this._http.patch<IRd>(`${this.baseExtractionUrl}/${id}`, data)
  }
}
