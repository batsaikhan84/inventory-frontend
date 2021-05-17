import { StoreRoomService } from 'src/app/shared/services/store-room.service';
import { IStoreRoom } from './../../../../shared/models/store-room.model';
import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-store-room-dropdown-renderer',
  templateUrl: './store-room-dropdown-renderer.component.html',
  styleUrls: ['./store-room-dropdown-renderer.component.scss']
})
export class StoreRoomDropdownRendererComponent implements OnInit, AgRendererComponent, ICellRendererAngularComp {
  constructor(private _storeRoomService: StoreRoomService) { }
  ngOnInit(): void {
  }
  selected: boolean;
  params: ICellRendererParams;
  rowItem: IStoreRoom;
  componentFromStoreRoom: any

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data
    this.selected = this.getValueToDisplay(params);
  }

  refresh(params: ICellRendererParams): any {
    this.selected = this.getValueToDisplay(params);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
  handleIsSpecialRequest(value: any) {
    const Is_Special_Request = value
    const data = {...this.rowItem, Is_Special_Request}
    this._storeRoomService.updateStoreRoomItem(data.ID, data).subscribe({
      next: data => data,
      error: error => error
    })
  }
}
