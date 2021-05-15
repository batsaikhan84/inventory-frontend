import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStoreRoom } from '../models/store-room.model';

@Injectable({
  providedIn: 'root'
})
export class StoreRoomService {
  baseExtractionUrl = 'http://localhost:3000/store-room'
  baseMasterUrl = 'http://localhost:3000/master'
  constructor(private _http: HttpClient) { }
  getStoreRoomItems() {
    return this._http.get<IStoreRoom[]>(this.baseExtractionUrl)
  }
  getStoreRoomMasterItems() {
    return this._http.get<IStoreRoom[]>(`${this.baseExtractionUrl}/master`)
  }
  getStoreRoomMasterItem(id: number) {
    return this._http.get<IStoreRoom>(`${this.baseMasterUrl}/${id}/store-room`)
  }
  updateStoreRoomItem(id: number, data: IStoreRoom) {
    return this._http.patch<IStoreRoom>(`${this.baseExtractionUrl}/${id}`, data)
  }
}





