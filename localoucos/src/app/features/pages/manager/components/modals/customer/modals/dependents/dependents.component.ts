import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/cutomer.service';
import { DependentsModel, DependentsPayload } from './models/dependents-model';
import { MatTableModule } from '@angular/material/table';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dependents',
  imports: [FormsModule, MatTableModule, ReactiveFormsModule ,MatDialogContent, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './dependents.component.html',
  styleUrl: './dependents.component.scss',
  providers:[provideNativeDateAdapter()]
})
export class DependentsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
      id: string;
    },
  ) {}

  private customerService = inject(CustomerService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'name', 'birth_date', 'gender', 'actions'];
  dataSource: DependentsModel[] = [];

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    birth_date: new FormControl<string>('', { validators: [Validators.required] }),
    gender: new FormControl<string>('', { validators: [Validators.required] }),
  });

  ngOnInit() {
    this.listDependents();
  }

  onSubmit() {
   console.log(this.data);
   const date = new Date(this.form.controls.birth_date.value!).toLocaleDateString();
      const payload: DependentsPayload = {
        name: this.form.controls.name.value as string,
        birth_date: this.reverseStringUsingLoop(date),
        gender: this.form.controls.gender.value!,
      };
      this.customerService.saveDependents(this.data.id, payload).subscribe({
        next: () => {
          //this.dialogRef.close();
          this.listDependents();
        },
      });
    }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  listDependents() {
    this.customerService.listDependents(this.data.id).subscribe({
      next: (response) => {
        this.dataSource = response;
      },
    });
  }

  reverseStringUsingLoop(str: string): string {
    console.log(str)
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

deleteCustomer(arg0: any) {
throw new Error('Method not implemented.');
}
openEditCustomerModal(arg0: any) {
throw new Error('Method not implemented.');
}

}
