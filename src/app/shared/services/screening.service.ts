import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IScreening } from '../models/screening.model';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {
  baseScreeningUrl = 'http://localhost:3000/screening'
  baseMasterUrl = 'http://localhost:3000/master'
  constructor(private _http: HttpClient) { }
  getScreeningItems() {
    return this._http.get<IScreening[]>(this.baseScreeningUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getScreeningMasterItems() {
    return this._http.get<IScreening[]>(`${this.baseScreeningUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getScreeningMasterItem(id: number) {
    return this._http.get<IScreening>(`${this.baseScreeningUrl}/master/${id}`)
  }
  getScreeningItemsOfMaster(id: number) {
    return this._http.get<IScreening>(`${this.baseMasterUrl}/${id}/screening`)
  }
  updateScreeningItem(id: number, data: IScreening) {
    return this._http.patch<IScreening>(`${this.baseScreeningUrl}/${id}`, data)
  }
}