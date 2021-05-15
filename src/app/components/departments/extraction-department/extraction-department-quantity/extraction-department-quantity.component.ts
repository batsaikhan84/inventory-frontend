import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { ExtractionService } from 'src/app/shared/services/extraction.service';

@Component({
  selector: 'app-extraction-department-quantity',
  templateUrl: './extraction-department-quantity.component.html',
  styleUrls: ['./extraction-department-quantity.component.scss']
})
export class ExtractionDepartmentQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IExtraction
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private extractionService: ExtractionService, 
              private dialog: MatDialogRef<ExtractionDepartmentQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getExtractionitemsOfMaster()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', minWidth: 500 },
      {headerName: 'Quantity', field: 'Quantity', minWidth: 140, editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getExtractionitemsOfMaster(): void {
    this.extractionService.getExtractionItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.extractionService.updateExtractionItem(value.data.ID, value.data).subscribe(response => 
      this.extractionService.getExtractionMasterItem(response.Item_ID).subscribe(responseData => this.rowItem = responseData)
    )
  }
}
