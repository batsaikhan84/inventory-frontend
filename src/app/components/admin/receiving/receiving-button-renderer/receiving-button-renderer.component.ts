import { IReceiving } from './../../../../shared/models/receiving.model';
import { ReceivingService } from './../../../../shared/services/receiving.service';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ReceivingQuantityComponent } from '../receiving-quantity/receiving-quantity.component';

@Component({
  selector: 'app-receiving-button-renderer',
  templateUrl: './receiving-button-renderer.component.html',
  styleUrls: ['./receiving-button-renderer.component.scss']
})
export class ReceivingButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, private receivingService: ReceivingService) { }
  rowItem: IReceiving;
  cellValue: number;
  params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data
    this.cellValue = Number(this.getValueToDisplay(params))
  }

  refresh(params: ICellRendererParams): any {
    this.cellValue = this.getValueToDisplay(params)
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {rowItem: this.rowItem, cellValue: this.cellValue}
    const currentDialog = this.dialog.open(ReceivingQuantityComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(() => this.params.context.receivingComponent.getReceivingQuantity())
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}


