import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { ScreeningService } from 'src/app/shared/services/screening.service';
import { ScreeningButtonRendererComponent } from './screening-button-renderer/screening-button-renderer.component';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {
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

  constructor(private screeningService: ScreeningService, private needToOrderService: NeedToOrderService, private columnDefsService: ColumnDefsService) { 
    this.frameworkComponents = { buttonRenderer: ScreeningButtonRendererComponent }
    this.context = { screeningComponent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getScreeningQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  getScreeningQuantity(): void {
    this.screeningService.getScreeningMasterItems().subscribe(responseData => this.rowData = responseData)
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
    this.screeningService.updateScreeningItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
}

