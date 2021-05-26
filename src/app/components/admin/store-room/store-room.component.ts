import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StoreRoomService } from 'src/app/shared/services/store-room.service';

@Component({
  selector: 'app-store-room',
  templateUrl: './store-room.component.html',
  styleUrls: ['./store-room.component.scss']
})
export class StoreRoomComponent implements OnInit {
  rowDataClicked = {}
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private storeRoomService: StoreRoomService, 
              private needToOrderService: NeedToOrderService,
              private snackbarService: SnackbarService) { }
  ngOnInit(): void {
    this.getStoreRoomMaster()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
    this.handleEditing()
  }
  getStoreRoomMaster(): void {
    this.storeRoomService.getStoreRoomMasterItems().subscribe({
      next: res => {
        this.rowData = res
      }
    })
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData
  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item ID', field: 'Item_ID', minWidth: 100},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit', minWidth: 150},
      {headerName: 'Part Number', field: 'Part_Number', minWidth: 150},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Location', field: 'Location', editable: true},
      {headerName: 'Total Quantity', field: 'Quantity', minWidth: 150, editable: true, 'type': 'numericColumn', 
        valueSetter: (params: any)=>{params.data.Quantity = Number(params.newValue)} },
      {headerName: 'Usage Level', field: 'Usage_Level', editable: true },
      {headerName: 'Min Quantity', field: 'Min_Quantity', editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Min_Quantity = params.newValue ? Number(params.newValue) : null}},
      {headerName: 'Max Quantity', field: 'Max_Quantity', editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Max_Quantity = params.newValue ? Number(params.newValue) : null}},
      {headerName: 'Need To Order', field: 'Order_Quantity', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Issued', field: 'Issued', editable: true},
      {headerName: 'Received', field: 'Received', editable: true }
    ]
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
  handleUpdate(params: any) {
    let data = null
    if(params.column.colId === 'Issued') {
      const Quantity = params.data.Quantity - Number(params.newValue)
      if(Quantity < 0) {
        this.snackbarService.openSnackBar('cannot issue more than total on hand', 'error')
        this.getStoreRoomMaster()
        return
      }
      const Issued = 0
      data = {...params.data, Quantity, Issued}
    } else if(params.column.colId === 'Received') {
      const Quantity = params.data.Quantity + Number(params.newValue)
      const Received = 0
      data = {...params.data, Quantity, Received}
    } else {
      data = {...params.data}
    }
    this.storeRoomService.updateStoreRoomItem(params.data.ID , data).subscribe({
      next: data =>{ 
        console.log(data)
        this.getStoreRoomMaster()},
      error: error => {
        console.error(error)
      }
    })
  }
}

