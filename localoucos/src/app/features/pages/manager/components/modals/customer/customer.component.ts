import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators,
  FormsModule,
  ReactiveFormsModule, } from '@angular/forms';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import {  MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import CustomerModel from './models/customer-model';
import { MatTableModule } from '@angular/material/table';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-customer',
  imports: [MatDialogContent, MatIcon, MatDialogActions, FormsModule, ReactiveFormsModule, MatTableModule, MatFormFieldModule, MatInput],
  templateUrl: './customer.component.html',
  providers: [
  { provide: MAT_DIALOG_DATA, useValue: {} },
  {provide: MatDialogRef, useValue: {CustomerComponent}}
],
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
openDependentsModal(arg0: any) {
throw new Error('Method not implemented.');
}
onCancel() {
throw new Error('Method not implemented.');
}
deleteCustomer(arg0: any) {
throw new Error('Method not implemented.');
}
openCustomerModal(arg0: any) {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
    },
  ) {}

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: CustomerModel[] = [];

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    telephone: new FormControl<string>('', { validators: [Validators.required] }),
    address: new FormControl<string>('', { validators: [Validators.required] }),
    brithDate: new FormControl<string>('', { validators: [Validators.required] }),
    cpf: new FormControl<string>('', { validators: [Validators.required] }),
    gender: new FormControl<string>('', { validators: [Validators.required] }),
  });

}
