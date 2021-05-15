import { ScreeningService } from './../../../../shared/services/screening.service';
import { IScreening } from './../../../../shared/models/screening.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-screening-quantity',
  templateUrl: './screening-quantity.component.html',
  styleUrls: ['./screening-quantity.component.scss']
})
export class ScreeningQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IScreening
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private screeningService: ScreeningService, 
              private dialog: MatDialogRef<ScreeningQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getMasterExtraction()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', minWidth: 500 },
      {headerName: 'Quantity', field: 'Quantity', minWidth: 140, editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getMasterExtraction(): void {
    this.screeningService.getScreeningItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.screeningService.updateScreeningItem(value.data.ID, value.data).subscribe(response => 
      this.screeningService.getScreeningMasterItem(response.Item_ID).subscribe(resData => this.rowItem = resData)
    )
  }
}
