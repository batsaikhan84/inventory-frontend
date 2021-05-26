import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ExtractionService } from '../../../../shared/services/extraction.service';

@Component({
  selector: 'app-extraction-quantity',
  templateUrl: './extraction-quantity.component.html',
  styleUrls: ['./extraction-quantity.component.scss']
})
export class ExtractionQuantityComponent implements OnInit {
  rowItem: IExtraction
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private extractionService: ExtractionService, 
              private dialog: MatDialogRef<ExtractionQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackbarService: SnackbarService) { 
    this.rowItem = data.rowItem
  }
  ngOnInit(): void {
    this.getExtractionItemsofMaster()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', minWidth: 500, editable: true },
      {headerName: 'Quantity', field: 'Quantity', minWidth: 140, editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Quantity = Number(params.newValue)} },
    ]
  }
  onClose() {
    this.dialog.close(this.rowItem)
  }
  getExtractionItemsofMaster(): void {
    this.extractionService.getExtractionItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData
  )}
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.extractionService.updateExtractionItem(value.data.ID, value.data).subscribe(response => 
      this.extractionService.getExtractionMasterItem(response.Item_ID).subscribe(response => {
        this.rowItem = response
      })
    
  )}
}
