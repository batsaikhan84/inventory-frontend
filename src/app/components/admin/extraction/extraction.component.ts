import { ExtractionService } from '../../../shared/services/extraction.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ExtractionButtonRendererComponent } from './extraction-button-renderer/extraction-button-renderer.component';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styleUrls: ['./extraction.component.scss']
})
export class ExtractionComponent implements OnInit {
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

  constructor(private extractionService: ExtractionService, 
              private columnDefsService: ColumnDefsService,
              private snackbarService: SnackbarService) { 
    this.frameworkComponents = { buttonRenderer: ExtractionButtonRendererComponent }
    this.context = { extractionComponent: this}
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getExtractionQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  download() {
    this.gridApi.exportDataAsCsv()
  }
  getExtractionQuantity(): void {
    this.extractionService.getExtractionMasterItems().subscribe({
      next: items => {
        this.rowData = items
      }
    })
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
    this.extractionService.updateExtractionItem(value.data.ID , value.data).subscribe({
      next: data => data,
      error: error => error
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
  sendEmailReport() {
    this.extractionService.sendEmailReport().subscribe({
      next: () => this.snackbarService.openSnackBar('Email has been sent', 'success'),
      error: () => this.snackbarService.openSnackBar('Email has not been sent', 'error')
    })
  }
}

