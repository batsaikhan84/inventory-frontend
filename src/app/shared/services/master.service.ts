import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IMaster } from '../models/master.model';

@Injectable({ providedIn: 'root' })
export class MasterService {
  baseUrl = 'http://localhost:3000/master'
  constructor(private _http: HttpClient) { }
  getMasterItems() {
    return this._http.get<IMaster[]>(this.baseUrl)
  }
  createMasterItem(masterItem: any) {
    return this._http.post<any>(this.baseUrl, masterItem)
  }
  updateMasterItem(id: number, selectedItem: IMaster, department: string, isSpecialRequest: boolean = false) {
    return this._http.patch<IMaster>(`${this.baseUrl}/${id}`, {masterItem: selectedItem, department: department, isSpecialRequest: isSpecialRequest})
  }
  deleteMasterItem(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`)
  }
}
