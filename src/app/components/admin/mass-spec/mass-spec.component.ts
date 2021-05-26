import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MassSpecButtonRendererComponent } from './mass-spec-button-renderer/mass-spec-button-renderer.component';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';

@Component({
  selector: 'app-mass-spec',
  templateUrl: './mass-spec.component.html',
  styleUrls: ['./mass-spec.component.scss']
})
export class MassSpecComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  context: any;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private massSpecService: MassSpecService, private needToOrderService: NeedToOrderService, private columnDefsService: ColumnDefsService) { 
    this.frameworkComponents = { buttonRenderer: MassSpecButtonRendererComponent }
    this.context = { massSpecCompoent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getMassSpecQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }

  }
  getMassSpecQuantity(): void {
    this.massSpecService.getMassSpecMasterItems().subscribe(responseData => this.rowData = responseData)
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
    this.massSpecService.updateMassSpecItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  autoSizeAll(skipHeader: any) {
    var allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: { colId: any; }) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }
}
