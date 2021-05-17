import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISpecialRequest } from '../models/special-request.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialRequestService {
  baseSpecialRequestUrl = 'http://localhost:3000/special-request'
  constructor(private _http: HttpClient) { }
  getSpecialRequestItems() {
    return this._http.get<ISpecialRequest[]>(this.baseSpecialRequestUrl)
  }
  createSpecialRequestItem(data: ISpecialRequest) {
    return this._http.post<ISpecialRequest>(this.baseSpecialRequestUrl, data)
  }
  updateSpecialRequestItem(id: number, data: any) {
    return this._http.patch<ISpecialRequest>(`${this.baseSpecialRequestUrl}/${id}`, data)
  }
}
