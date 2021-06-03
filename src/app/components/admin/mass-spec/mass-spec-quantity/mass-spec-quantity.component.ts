import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { IMassSpec } from './../../../../shared/models/mass-spec.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-mass-spec-quantity',
  templateUrl: './mass-spec-quantity.component.html',
  styleUrls: ['./mass-spec-quantity.component.scss']
})
export class MassSpecQuantityComponent implements OnInit {
  rowItem: IMassSpec
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private massSpecService: MassSpecService, 
              private dialog: MatDialogRef<MassSpecQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackbarService: SnackbarService) { 
    this.rowItem = data.rowItem
  }
  ngOnInit(): void {
    this.getMasterMassSpec()
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
  getMasterMassSpec(): void {
    this.massSpecService.getMassSpecItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  // handleUpdate(value: any) {
  //   this.massSpecService.updateMassSpecItem(value.data.ID, value.data).subscribe(response => 
  //     this.massSpecService.getMassSpecMasterItem(response.Item_ID).subscribe(resData => this.rowItem = resData)
  //   )
  // }
  handleUpdate(params: any) {
    let data = null
    if(params.column.colId === 'Issued') {
      const Quantity = params.data.Quantity - Number(params.newValue)
      if(Quantity < 0) {
        this.snackbarService.openSnackBar('cannot issue more than total on hand', 'error')
        this.getMasterMassSpec()
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
    this.massSpecService.updateMassSpecItem(params.data.ID , data).subscribe({
      next: data =>{ 
        this.getMasterMassSpec()},
      error: error => {
        console.error(error)
      }
    })
  }
}
