import { EmailService } from './../../../shared/services/email.service';
import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ISpecialRequest } from 'src/app/shared/models/special-request.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConfirmationDataService } from 'src/app/shared/services/confirmation-data.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';
import { StatusDataService } from 'src/app/shared/services/status-data.service';

@Component({
  selector: 'app-store-room-special-request-confirmation',
  templateUrl: './store-room-special-request-confirmation.component.html',
  styleUrls: ['./store-room-special-request-confirmation.component.scss']
})
export class StoreRoomSpecialRequestConfirmationComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  isButtonDisabled: boolean = true;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  selectedRows: ISpecialRequest[];

  constructor(private specialRequestService: SpecialRequestService,
              private authService: AuthService,
              private dialogService: DialogService,
              private confirmationDataService: ConfirmationDataService,
              private statusDataService: StatusDataService,
              private emailService: EmailService) {
  }

  ngOnInit(): void {
    this.getSpecialRequestItems()
    this.confirmationDataService.currentConfirmationItems.subscribe(res => this.rowData = res)
    this.handleEditing()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }

  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'Item_ID', minWidth: 100, maxWidth: 110, checkboxSelection: true, headerCheckboxSelection: true, },
      {headerName: 'Item', field: 'Item', minWidth: 850},
      {headerName: 'Quantity', field: 'Quantity', minWidth: 210, editable: true },
      {headerName: 'Status', field: 'Status', minWidth: 210},
      {headerName: 'Time Requested', field: 'Time_Requested', minWidth: 210,  valueFormatter: function(params: any) {
        return new Date(params.data.Time_Requested).toLocaleDateString()
      }},
      {headerName: 'Time Updated', field: 'Time_Updated',  valueFormatter: function(params: any) {
        return new Date(params.data.Time_Requested).toLocaleDateString()
      }}
    ]
  }
  handleConfirmation() {
    this.dialogService.confirmationDialog("Please Cofirm your special request.").afterClosed().subscribe(res => {
      if(res === true) {
        const itemsToEmail: ISpecialRequest[] = []
        this.selectedRows.map(selectedRow => {
          const data = {
            Is_Confirmed: true
          }
          this.specialRequestService.updateSpecialRequestItem(selectedRow.ID, data).subscribe({
            next: (data) => {
              itemsToEmail.push(data)
              this.getSpecialRequestItems() 
              this.getStatusItems()
              this.isButtonDisabled = true
            },
            error: error => error
          })
        })
      this.emailService.sendSrSpecialRequestEmail({
        confirmationItems: itemsToEmail, 
        department: this.authService.getCurrentUser().department}).subscribe()
      }
    })
  }
  getStatusItems(): void {
    this.specialRequestService.getSpecialRequestItems().subscribe({
      next: data => {
        const statusData: any = data.filter(specialRequestItem => 
        specialRequestItem.Is_Confirmed === true && specialRequestItem.Department === this.authService.getCurrentUser().department)
        .map(statusItem => ({
          ...statusItem,
          Item: statusItem.master?.Item
        }))
        this.statusDataService.updateCofirmationItems(statusData)
      },
      error: error => error
    })
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedRows = selectedNodes.map(node => {
      return node.data
    })
    if(this.selectedRows.length > 0) {
      this.isButtonDisabled = false
    } else {
      this.isButtonDisabled = true
    }
  }
  getSpecialRequestItems(): void {
    this.specialRequestService.getSpecialRequestItems().subscribe({
      next: data => {
        const confirmationData: any = data.filter(specialRequestItem => 
         specialRequestItem.Is_Confirmed === false && specialRequestItem.Department === this.authService.getCurrentUser().department
        ).map(specialRequestItem => ({
          ...specialRequestItem,
          Item: specialRequestItem.master?.Item
        }))
        this.confirmationDataService.updateCofirmationItems(confirmationData)
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
