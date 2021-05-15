import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaster } from 'src/app/shared/models/master.model';
import { ISpecialRequest } from 'src/app/shared/models/special-request.mode';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';

@Component({
  selector: 'app-admin-special-request',
  templateUrl: './admin-special-request.component.html',
  styleUrls: ['./admin-special-request.component.scss']
})
export class AdminSpecialRequestComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  isButtonDisabled: boolean;
  selectedItem: IMaster;
  searchValue: string;
  editText: string = 'Start Editing';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private _specialRequestService: SpecialRequestService) { }

  ngOnInit(): void {
    this.getMasterInventory()
    this.isButtonDisabled = true
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      editable: true
    }
    this.handleEditing()
  }
  getMasterInventory(): void {
    this._specialRequestService.getSpecialRequestItems().subscribe(response => this.rowData = response)
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
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', maxWidth: 100 },
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Quantity', field: 'Quantity'},
      {headerName: 'Department', field: 'Department'},
      {headerName: 'Status', field: 'Status', cellStyle: { 'background-color': 'lightblue', 'font-weight': 600 }, editable: true, cellEditor: 'agSelectCellEditor', 
        cellEditorParams: { values: ['Completed', 'Pending', 'Cancelled', 'Ordered', 'Back Ordered' ] }
      },
      {headerName: 'Time Requested', field: 'Time_Requested', valueFormatter: function(params: any) {
        return new Date(params.data.Time_Requested).toLocaleDateString()
      }},
      {headerName: 'Time Updated', field: 'Time_Updated', valueFormatter: function(params: any) {
        return new Date(params.data.Time_Updated).toLocaleDateString()
      }},
    ]
  }
  onCellValueChanged(params: any) {
    this._specialRequestService.updateSpecialRequestItem(params.data.ID, params.data).subscribe(response => this.getMasterInventory())
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
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
  handleUpdate(value: any) {

  }
  onSearchClear() {
    this.searchValue = ''
  }
}

  