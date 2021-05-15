import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaster } from 'src/app/shared/models/master.model';
import { MasterService } from 'src/app/shared/services/master.service';
import { SpecialRequestFormComponent } from '../forms/special-request-form/special-request-form.component';

@Component({
  selector: 'app-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss']
})
export class SpecialRequestComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  isButtonDisabled: boolean = true
  selectedItem: IMaster;
  searchValue: string;
  editText: string = 'Start Editing';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private dialog: MatDialog, private masterService: MasterService) { }

  ngOnInit(): void {
    this.getMasterInventory()
    this.handleEditing()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }

  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100, maxWidth: 110, checkboxSelection: true},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Recent CN', field: 'Recent_CN' },
      {headerName: 'Purchase Unit', field: 'Purchase_Unit'},
      {headerName: 'Part Number', field: 'Part_Number'},
      {headerName: 'Comments', field: 'Comments', minWidth: 300}
    ]
  }
  getMasterInventory(): void {
    this.masterService.getMasterItems().subscribe(response => this.rowData = response)
  }
  handleSendRequest() {
    this.openDialog()
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = this.selectedItem
    const currentDialog = this.dialog.open(SpecialRequestFormComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(result => this.gridApi.deselectAll())
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const getSelectedData = selectedNodes.map(node => {
      this.selectedItem = node.data
      return node.data
    })
    if(getSelectedData.length > 0) {
      this.isButtonDisabled = false
    } else {
      this.isButtonDisabled = true
    }
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  autoSizeAll(skipHeader: any) {
    var allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: { colId: any; }) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
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
}
