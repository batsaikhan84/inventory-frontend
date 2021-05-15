import { ISpecialRequest } from 'src/app/shared/models/special-request.mode';
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
  specialRequestItem: ISpecialRequest
  specialRequestForm = new FormGroup({
    Quantity: new FormControl('', [Validators.required]),
  })
  constructor(private _specialRequestService: SpecialRequestService, 
              private dialog: MatDialogRef<SpecialRequestFormComponent>, 
              @Inject(MAT_DIALOG_DATA) 
              public data: any,
              private authService: AuthService) { 
    this.specialRequestItem = data
  }
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser()
  }
  onSubmit() {
    const data: ISpecialRequest = {
      Item_ID: this.specialRequestItem.ID,
      Quantity: Number(this.specialRequestForm.value.Quantity),
      Item: this.specialRequestItem.Item,
      Recent_CN: this.specialRequestItem.Recent_CN,
      Department: this.currentUser.department,
      User_Name: this.currentUser.name
    }
    this._specialRequestService.createSpecialRequestItem(data).subscribe(response => alert(response.Item))
    this.onClose()
  }
  onClose() {
    this.dialog.close()
  }
}
