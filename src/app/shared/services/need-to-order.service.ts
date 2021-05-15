import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NeedToOrderService {

  constructor() { }
  getNeedToOrderNumber(params: any) {
    console.log(params)
    if(params.data.Min_Quantity === null || params.data.Max_Quantity === null) {
      return 'There is no max min'
    } else {
      if(!params.data.is_Need_To_Order) {
        return 'No Need To Order'
      }
      return Math.abs(params.data.Order_Quantity)
    }
  }
  styleNeedToOrder(params: any) {
    const isNeedToOrder =  params.data.Min_Quantity >= params.data.Quantity
    if(params.data.Min_Quantity !== null || params.data.Max_Quantity !== null) {
      if(!params.data.is_Need_To_Order) {
        return { 'background-color': '#90EE90', 'text-align': 'center'}
      }
      return { 'background-color': '#FF0000', 'font-weight': 900, 'color': 'yellow', 'font-size': '1.2em', 'text-align': 'center'  }
    }
    return { 'background-color': '#eded00', 'text-align': 'center'}


  }
}
