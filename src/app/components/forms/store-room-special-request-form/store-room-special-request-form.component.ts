import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISpecialRequest } from 'src/app/shared/models/special-request.model';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';

@Component({
  selector: 'app-store-room-special-request-form',
  templateUrl: './store-room-special-request-form.component.html',
  styleUrls: ['./store-room-special-request-form.component.scss']
})
export class StoreRoomSpecialRequestFormComponent implements OnInit {
  currentUser: IUser
  specialRequestItem: any
  specialRequestForm = new FormGroup({
    Quantity: new FormControl('', [Validators.required]),
  })
  constructor(private _specialRequestService: SpecialRequestService, 
              private dialog: MatDialogRef<StoreRoomSpecialRequestFormComponent>, 
              private _dataService: DataService,
              @Inject(MAT_DIALOG_DATA) 
              public data: any,
              private authService: AuthService) { 
    this.specialRequestItem = data
  }
  ngOnInit() {
    this.currentUser = this._dataService.getUser()
    console.log(this.specialRequestItem)
  }
  onSubmit() {
    const data: ISpecialRequest = {
      Item_ID: this.specialRequestItem.Item_ID,
      Quantity: Number(this.specialRequestForm.value.Quantity),
      Item: this.specialRequestItem.Item,
      Recent_CN: this.specialRequestItem.Recent_CN,
      Is_Special_Request: this.specialRequestItem.Is_Special_Request,
      Department: this.currentUser.department,
      User_Name: this.currentUser.name,
    }
    this._specialRequestService.createSpecialRequestItem(data).subscribe(response => alert(response.Item))
    this.onClose()
  }
  onClose() {
    this.dialog.close()
  }
}
