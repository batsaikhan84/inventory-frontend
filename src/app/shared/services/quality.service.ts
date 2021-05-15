import { IQuality } from './../models/quality.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QualityService {
  baseExtractionUrl = 'http://localhost:3000/quality'
  baseMasterUrl = 'http://localhost:3000/master'
  constructor(private _http: HttpClient) { }
  getQualityItems() {
    return this._http.get<IQuality[]>(this.baseExtractionUrl)
  }
  getQualityMasterItems() {
    return this._http.get<IQuality[]>(`${this.baseExtractionUrl}/master`)
  }
  getQualityMasterItem(id: number) {
    return this._http.get<IQuality>(`${this.baseExtractionUrl}/master/${id}`)
  }
  getQualityItemsOfMaster(id: number) {
    return this._http.get<IQuality>(`${this.baseMasterUrl}/${id}/quality`)
  }
  updateQualityItem(id: number, data: IQuality) {
    return this._http.patch<IQuality>(`${this.baseExtractionUrl}/${id}`, data)
  }
}
