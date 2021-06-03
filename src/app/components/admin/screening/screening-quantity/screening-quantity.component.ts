import { ScreeningService } from './../../../../shared/services/screening.service';
import { IScreening } from './../../../../shared/models/screening.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

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
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackbarService: SnackbarService) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getMasterScreening()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', minWidth: 500, editable: true },
      {headerName: 'Quantity', field: 'Quantity', minWidth: 140, editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Quantity = Number(params.newValue)} },
      {headerName: 'Issued', field: 'Issued', editable: true},
      {headerName: 'Received', field: 'Received', editable: true }
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getMasterScreening(): void {
    this.screeningService.getScreeningItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  // handleUpdate(value: any) {
  //   this.screeningService.updateScreeningItem(value.data.ID, value.data).subscribe(response => 
  //     this.screeningService.getScreeningMasterItem(response.Item_ID).subscribe(resData => this.rowItem = resData)
  //   )
  // }
  handleUpdate(params: any) {
    let data = null
    if(params.column.colId === 'Issued') {
      const Quantity = params.data.Quantity - Number(params.newValue)
      if(Quantity < 0) {
        this.snackbarService.openSnackBar('cannot issue more than total on hand', 'error')
        this.getMasterScreening()
        return
      }
      const Issued = 0
      data = {...params.data, Quantity, Issued}
    } else if(params.column.colId === 'Received') {
      const Quantity = params.data.Quantity + Number(params.newValue)
      const Received = 0
      data = {...params.data, Quantity, Received}
    } else {
      data = {...params.data}
    }
    this.screeningService.updateScreeningItem(params.data.ID , data).subscribe({
      next: data =>{ 
        this.getMasterScreening()},
      error: error => {
        console.error(error)
      }
    })
  }
}
