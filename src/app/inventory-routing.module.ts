import { StoreRoomSpecialRequestComponent } from './components/departments/store-room-special-request/store-room-special-request.component';
import { StoreRoomComponent } from './components/admin/store-room/store-room.component';
import { ReceivingComponent } from './components/admin/receiving/receiving.component';
import { MassSpecComponent } from './components/admin/mass-spec/mass-spec.component';
import { ExtractionComponent } from './components/admin/extraction/extraction.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MasterComponent } from './components/admin/master/master.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChemicalComponent } from './components/chemical/chemical.component';
import { AuthGuard } from './components/auth/auth.guard';
import { SpecialRequestComponent } from './components/special-request/special-request.component';
import { ScreeningComponent } from './components/admin/screening/screening.component';
import { RdComponent } from './components/admin/rd/rd.component';
import { QualityComponent } from './components/admin/quality/quality.component';
import { ScreeningDepartmentComponent } from './components/departments/screening-department/screening-department.component';
import { RdDepartmentComponent } from './components/departments/rd-department/rd-department.component';
import { QualityDepartmentComponent } from './components/departments/quality-department/quality-department.component';
import { SafetyDepartmentComponent } from './components/departments/safety-department/safety-department.component';
import { AdminSpecialRequestComponent } from './components/admin/admin-special-request/admin-special-request.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { DepartmentsHomeComponent } from './components/departments/departments-home/departments-home.component';
import { ExtractionDepartmentComponent } from './components/departments/extraction-department/extraction-department.component';
import { MassSpecDepartmentComponent } from './components/departments/mass-spec-department/mass-spec-department.component';
import { ReceivingDepartmentComponent } from './components/departments/receiving-department/receiving-department.component';
import { ResetPasswordComponent } from './components/auth/reset/reset-password.component';
import { AdminSrSpecialRequestComponent } from './components/admin/admin-special-request/admin-sr-special-request/admin-sr-special-request.component';

const routes: Routes = [
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'chemical', component: ChemicalComponent , canActivate: [AuthGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'master', component: MasterComponent},
      { path: 'extraction', component: ExtractionComponent },
      { path: 'store-room-special-request', component: AdminSrSpecialRequestComponent},
      { path: 'general-special-request', component: AdminSpecialRequestComponent},
      { path: 'mass-spec', component: MassSpecComponent},
      { path: 'receiving', component: ReceivingComponent},
      { path: 'store-room', component: StoreRoomComponent},
      { path: 'screening', component: ScreeningComponent},
      { path: 'rd', component: RdComponent},
      { path: 'quality', component: QualityComponent},
    ]},
  { path: 'department', component: DepartmentsHomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'store-room', component: StoreRoomSpecialRequestComponent},
      { path: 'special-request', component: SpecialRequestComponent},
      { path: 'extraction', component: ExtractionDepartmentComponent},
      { path: 'receiving', component: ReceivingDepartmentComponent},
      { path: 'mass-spec', component: MassSpecDepartmentComponent},
      { path: 'screening', component: ScreeningDepartmentComponent},
      { path: 'rd', component: RdDepartmentComponent},
      { path: 'quality', component: QualityDepartmentComponent},
      { path: 'safety', component: SafetyDepartmentComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
