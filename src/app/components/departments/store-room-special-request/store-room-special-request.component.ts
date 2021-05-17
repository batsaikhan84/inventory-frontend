import { StoreRoomService } from '../../../shared/services/store-room.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaster } from 'src/app/shared/models/master.model';
import { StoreRoomSpecialRequestFormComponent } from '../../forms/store-room-special-request-form/store-room-special-request-form.component';

@Component({
  selector: 'app-store-room-special-request',
  templateUrl: './store-room-special-request.component.html',
  styleUrls: ['./store-room-special-request.component.scss']
})
export class StoreRoomSpecialRequestComponent implements OnInit {
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

  constructor(private dialog: MatDialog, private storeRoomService: StoreRoomService) { }

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
    this.storeRoomService.getStoreRoomMasterItems().subscribe({
      next: data => this.rowData = data.filter(storeRoomItems => 
        storeRoomItems.Is_Special_Request === true
      ),
      error: error => error
    })
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
    const currentDialog = this.dialog.open(StoreRoomSpecialRequestFormComponent, dialogConfig)
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
