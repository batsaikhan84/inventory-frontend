import { IReceiving } from '../../../shared/models/receiving.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from '../../forms/new-item-form/form.component';
import { ReceivingService } from 'src/app/shared/services/receiving.service';
import { ReceivingButtonRendererComponent } from './receiving-button-renderer/receiving-button-renderer.component';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.scss']
})
export class ReceivingComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private receivingService: ReceivingService, private needToOrderService: NeedToOrderService, private columnDefsService: ColumnDefsService) { 
    this.frameworkComponents = { buttonRenderer: ReceivingButtonRendererComponent }
    this.context = { receivingComponent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getReceivingQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  getReceivingQuantity(): void {
    this.receivingService.getReceivingMasterItems().subscribe(responseData => this.rowData = responseData)
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleSearch(value: string) {
    this.gridApi.setQuickFilter(value);
  }
  handleClearSearch() {
    this.searchValue = ''
    this.handleSearch(this.searchValue)
  }
  handleUpdate(value: any) {
    this.receivingService.updateReceivingItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
}
