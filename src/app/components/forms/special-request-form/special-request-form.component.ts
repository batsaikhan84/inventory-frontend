import { DataService } from 'src/app/shared/services/data.service';
import { ISpecialRequest } from 'src/app/shared/models/special-request.model';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-special-request-form',
  templateUrl: './special-request-form.component.html',
  styleUrls: ['./special-request-form.component.scss']
})
export class SpecialRequestFormComponent implements OnInit {
  currentUser: IUser
  specialRequestItem: any
  specialRequestForm = new FormGroup({
    Quantity: new FormControl('', [Validators.required]),
  })
  constructor(private _specialRequestService: SpecialRequestService, 
              private dialog: MatDialogRef<SpecialRequestFormComponent>, 
              private _dataService: DataService,
              @Inject(MAT_DIALOG_DATA) 
              public data: any,
              private authService: AuthService) { 
    this.specialRequestItem = data
  }
  ngOnInit() {
    this.currentUser = this._dataService.getUser()
  }
  onSubmit() {
    const data: ISpecialRequest = {
      ID: this.specialRequestItem.ID,
      Quantity: Number(this.specialRequestForm.value.Quantity),
      Item: this.specialRequestItem.Item,
      Recent_CN: this.specialRequestItem.Recent_CN,
      Department: this.currentUser.department,
      User: this.currentUser.name,
      Is_Confirmed: false
    }
    console.log(data)
    this._specialRequestService.createSpecialRequestItem(data).subscribe(response => alert(response.Item))
    this.onClose()
  }
  onClose() {
    this.dialog.close()
  }
}
