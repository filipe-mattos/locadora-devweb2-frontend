import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators,
  FormsModule,
  ReactiveFormsModule, } from '@angular/forms';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import {  MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import CustomerModel, { CustomerPayload } from './models/customer-model';
import { MatTableModule } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { CustomerService } from './services/cutomer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditComponent } from './modals/edit/edit.component';
import { DependentsComponent } from './modals/dependents/dependents.component';

@Component({
  selector: 'app-customer',
  imports: [MatDialogContent, MatIcon, MatSelectModule, MatButton, FormsModule, ReactiveFormsModule, MatTableModule, MatFormFieldModule, MatInput, MatDatepickerModule],
  templateUrl: './customer.component.html',
  providers: [
  { provide: MAT_DIALOG_DATA, useValue: {} },
  {provide: MatDialogRef, useValue: {CustomerComponent}},
  provideNativeDateAdapter()
],
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
    },
  ) {}

  private customerService = inject(CustomerService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'name', 'phone', 'address', 'birth_date', 'cpf', 'gender', 'actions'];
  dataSource: CustomerModel[] = [];

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    phone: new FormControl<string>('', { validators: [Validators.required] }),
    address: new FormControl<string>('', { validators: [Validators.required] }),
    birth_date: new FormControl<string>('', { validators: [Validators.required] }),
    cpf: new FormControl<string>('', { validators: [Validators.required] }),
    gender: new FormControl<string>('', { validators: [Validators.required] }),
  });

  ngOnInit() {
    this.listCustomer();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  reverseStringUsingLoop(str: string): string {
    let splited = str.split('/')
    console.log(splited)
    let reversed = '';
    let formated = splited[1]
    let formated2 = splited[0]
    splited[0] = formated;
    splited[1] = formated2
    for (let i = splited.length - 1; i >= 0; i--) {
        if(i<1){
          reversed += splited[i];
        }else{
          reversed += splited[i]+'-';
        }
    }
    console.log(reversed)
    return reversed;
  }

  openDependentsModal(id: string) {
    const dialogRef = this.dialog.open(DependentsComponent, {
      data: {
        ref: this.dialog,
        id,
        // response: this.dataSource
      },
      maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listCustomer();
    });
  }

  deleteCustomer(id: string) {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.snackBar.open('Socio deletado com sucesso', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.listCustomer();
      },
      error: () => {
        this.snackBar.open('Socio possui dependentes', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  openEditCustomerModal(id: string) {
    console.log(id);
        const dialogRef = this.dialog.open(EditComponent, {
          data: {
            ref: this.dialog,
            id,
           // response: this.dataSource
          },
          maxWidth: '1000px',
        });

        dialogRef.afterClosed().subscribe(() => {
          this.listCustomer();
        });
  }

  listCustomer() {
    this.customerService.listCustomer().subscribe({
      next: (customers) => {
        this.dataSource = customers;
      },
      error: () => {
        this.snackBar.open('Adicione um Socio', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
          return;
        }

    const date = new Date(this.form.controls.birth_date.value!).toLocaleDateString();
    console.log(date)
    //let formatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    //console.log(formatedDate)
    const payload: CustomerPayload = {
      name: this.form.controls.name.value!,
      phone: this.form.controls.phone.value!,
      address: this.form.controls.address.value!,
      birth_date: this.reverseStringUsingLoop(date),
      cpf: this.form.controls.cpf.value!,
      gender: this.form.controls.gender.value!,
    };
    console.log(payload)
    this.customerService.saveCustomer(payload).subscribe({

      next: () => {
        this.snackBar.open('Item cadastrado com sucesso', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.form.reset();
        this.listCustomer();
      },
    });
  }


}
