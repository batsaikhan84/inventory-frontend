import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { QualityService } from 'src/app/shared/services/quality.service';
import { QualityButtonRendererComponent } from './quality-button-renderer/quality-button-renderer.component';


@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {
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

  constructor(private qualityService: QualityService, private needToOrderService: NeedToOrderService, private columnDefsService: ColumnDefsService) { 
    this.frameworkComponents = { buttonRenderer: QualityButtonRendererComponent }
    this.context = { QualityComponent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getQualityQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  getQualityQuantity(): void {
    this.qualityService.getQualityMasterItems().subscribe(responseData => this.rowData = responseData)
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
    this.qualityService.updateQualityItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
}

