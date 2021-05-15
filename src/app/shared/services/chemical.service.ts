import { IMaster } from 'src/app/shared/models/master.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChemicalService {
  chemicalUrl = 'http://localhost:3000/master/chemical'
  constructor(private _http: HttpClient) { }
  getChemicalItems() {
    return this._http.get<IMaster>(this.chemicalUrl)
  }
}
