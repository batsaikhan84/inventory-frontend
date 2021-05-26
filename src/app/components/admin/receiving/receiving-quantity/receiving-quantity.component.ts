import { ReceivingService } from './../../../../shared/services/receiving.service';
import { IReceiving } from './../../../../shared/models/receiving.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-receiving-quantity',
  templateUrl: './receiving-quantity.component.html',
  styleUrls: ['./receiving-quantity.component.scss']
})
export class ReceivingQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IReceiving
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private receivingService: ReceivingService, 
              private dialog: MatDialogRef<ReceivingQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getMasterReceiving()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', minWidth: 500, editable: true },
      {headerName: 'Quantity', field: 'Quantity', minWidth: 140, editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getMasterReceiving(): void {
    this.receivingService.getReceivingItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.receivingService.updateReceivingItem(value.data.ID, value.data).subscribe(response => 
      this.receivingService.getReceivingMasterItem(response.Item_ID).subscribe(resData => this.rowItem = resData)  
    )
  }
}
