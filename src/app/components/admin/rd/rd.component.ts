import { RdService } from 'src/app/shared/services/rd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { RdButtonRendererComponent } from './rd-button-renderer/rd-button-renderer.component';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';


@Component({
  selector: 'app-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss']
})
export class RdComponent implements OnInit {
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

  constructor(private rdService: RdService, private needToOrderService: NeedToOrderService, private columnDefsService: ColumnDefsService) { 
    this.frameworkComponents = { buttonRenderer: RdButtonRendererComponent }
    this.context = { rdCompoent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getRdQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  getRdQuantity(): void {
    this.rdService.getRdMasterItems().subscribe(responseData => this.rowData = responseData)
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
    this.rdService.updateRdItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
}

