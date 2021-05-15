import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { IMassSpec } from './../../../../shared/models/mass-spec.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
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
    this.massSpecService.getMassSpecItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.massSpecService.updateMassSpecItem(value.data.ID, value.data).subscribe(response => 
      this.massSpecService.getMassSpecMasterItem(response.Item_ID).subscribe(resData => this.rowItem = resData)
    )
  }
}
