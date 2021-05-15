import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-renderer',
  templateUrl: './status-renderer.component.html',
  styleUrls: ['./status-renderer.component.scss']
})
export class StatusRendererComponent implements INoRowsOverlayAngularComp {
  status: any;

  constructor() { }

  agInit(params: ICellRendererParams): void {
    console.log(params)
  }

}
