import { Injectable } from '@angular/core';
import { NeedToOrderService } from './need-to-order.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnDefsService {

  constructor(private needToOrderService: NeedToOrderService) { }
  columnDefs() {
    const columnDefs = [
      {headerName: 'ID', field: 'Item_ID', Width: 100},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit', minWidth: 150},
      {headerName: 'Part Number', field: 'Part_Number', minWidth: 150},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Total Quantity', field: 'Quantity', minWidth: 150, cellRenderer: 'buttonRenderer' },
      {headerName: 'Usage Level', field: 'Usage_Level', minWidth: 150, editable: true },
      {headerName: 'Min Quantity', field: 'Min_Quantity', editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Min_Quantity = Number(params.newValue)}},
      {headerName: 'Max Quantity', field: 'Max_Quantity', editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Max_Quantity = Number(params.newValue)} },
      {headerName: 'Need To Order', field: 'Order_Quantity', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 200 }
    ]
    return columnDefs
  }
}