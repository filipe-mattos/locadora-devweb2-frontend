import { Component, Inject, inject, Injectable } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClassModel, ClassPayload } from './models/class';
import { ClassService } from './service/class.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditComponent } from '../class/modals/edit/edit.component';

@Component({
  selector: 'app-actor',
  imports: [
    //MatDialogContent,
   // MatDialogActions,
    MatTableModule,
    MatIconModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  { provide: MAT_DIALOG_DATA, useValue: {} },
  {provide: MatDialogRef, useValue: {ClassComponent}}
],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
})
export class ClassComponent {
  private matMdcDialogData = inject(MAT_DIALOG_DATA);
  private classService = inject(ClassService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<ClassComponent>);

  constructor(
    // @Inject(MAT_DIALOG_DATA)
    // public data: {
    //   ref: MatDialog;
    // },
  ) {}

  displayedColumns: string[] = ['id', 'name', 'value', 'return_date', 'actions'];
  dataSource: ClassModel[] = [];

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    value: new FormControl<number>(0, { validators: [Validators.required] }),
    devolution: new FormControl<number>(0, { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.listActors();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  //adicionar chamada de api para o crud de ator

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload: ClassPayload = {
      name: this.form.controls.name.value as string,
      value: this.form.controls.value.value as number,
      return_date: this.form.controls.devolution.value as number,
    };

    console.log(payload);

    this.classService.saveActor(payload).subscribe({
      next: () => {
        this.snackBar.open('Classe cadastrada com sucesso', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.form.reset();
        this.listActors();
      },
    });
  }

  listActors() {
    //Essa funcao vai precisar popular o objeto da tabela\
    console.log('Listando atores');
    this.classService.listActors().subscribe({
      next: (classes) => {
        this.dataSource = classes;
      },
      error: () => {
        this.snackBar.open('Adicione uma Classe', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  deleteActor(id: string) {
    console.log(id);
    this.classService.deleteActor(id).subscribe({
      next: () => {
        this.snackBar.open('Classe deletada com sucesso', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.listActors();
      },
    });
  }

  openActorModal(id: string): void {
    console.log(id);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        ref: this.dialog,
        id,
       // response: this.dataSource
      },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listActors();
    });
  }
  updateActor(id: string, payload: ClassPayload) {
    //Pensar em como fazer a logica para dar update no actor direto da tabela
    this.classService.updateActor(id, payload).subscribe({});
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
}
