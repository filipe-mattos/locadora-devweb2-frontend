import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CustomerService } from '../../services/cutomer.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerPayload } from '../../models/customer-model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  imports: [MatDialogContent, MatFormFieldModule, MatSelectModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatButton, MatInputModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class EditComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
      id: string;
    },
  ) {}

  private customerService = inject(CustomerService);
  readonly dialogRef = inject(MatDialogRef<EditComponent>);

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    phone: new FormControl<string>('', { validators: [Validators.required] }),
    address: new FormControl<string>('', { validators: [Validators.required] }),
    birth_date: new FormControl<string>('', { validators: [Validators.required] }),
    cpf: new FormControl<string>('', { validators: [Validators.required] }),
    gender: new FormControl<string>('', { validators: [Validators.required] }),
  });

   reverseStringUsingLoop(str: string): string {
    let splited = str.split('/')
    console.log(splited)
    let reversed = '';
    //let formated = splited[1]
    //let formated2 = splited[0]
    //splited[0] = formated;
    //splited[1] = formated2
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
      this.customerService.updateCustomer(this.data.id, payload).subscribe({

        next: () => {
          this.dialogRef.close();
        },
      });
    }

}
