import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SpecialRequestStatusDataService } from 'src/app/shared/services/special-request-status-data.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';


@Component({
  selector: 'app-special-request-status',
  templateUrl: './special-request-status.component.html',
  styleUrls: ['./special-request-status.component.scss']
})
export class SpecialRequestStatusComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private specialRequestService: SpecialRequestService,
              private authService: AuthService,
              private specialRequestStatusDataService: SpecialRequestStatusDataService,
              private snackbarService: SnackbarService ) { }

  ngOnInit(): void {
    this.getStatusItems()
    this.specialRequestStatusDataService.currentStatusItems.subscribe({
      next: data => this.rowData = data,
      error: (error) => this.snackbarService.openSnackBar(error.toString(), 'error')
    })
    this.handleEditing()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }

  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'Item_ID', minWidth: 100, maxWidth: 110 },
      {headerName: 'Item', field: 'Item', minWidth: 850},
      {headerName: 'Quantity', field: 'Quantity', minWidth: 220 },
      {headerName: 'Status', field: 'Status', minWidth: 220},
      {headerName: 'Time Requested', field: 'Time_Requested', minWidth: 230,  valueFormatter: function(params: any) {
        return new Date(params.data.Time_Requested).toLocaleDateString()
      }},
      {headerName: 'Time Updated', field: 'Time_Updated', minWidth: 230,  valueFormatter: function(params: any) {
        return new Date(params.data.Time_Requested).toLocaleDateString()
      }}
    ]
  }
  getStatusItems(): void {
    this.specialRequestService.getSpecialRequestItems().subscribe({
      next: data => {
        const statusData: any = data.filter(specialRequestItem => 
        specialRequestItem.Is_Confirmed === true && 
        specialRequestItem.Is_Store_Room_Item === false &&
        specialRequestItem.Department === this.authService.getCurrentUser().department
        )
        .map(statusItem => ({
          ...statusItem,
          Item: statusItem.master?.Item,
          Recent_CN: statusItem.master?.Recent_CN
        }))
        this.specialRequestStatusDataService.updateStatusItems(statusData)
      },
      error: error => error
    })
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
  handleClearSearch() {
    this.searchValue = ''
    this.handleSearch(this.searchValue)
  }
}
