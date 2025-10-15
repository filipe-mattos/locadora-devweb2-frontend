import { Component, Inject, inject, Injectable } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { ClassService } from './service/director.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditComponent } from '../actor/modals/edit/edit.component';

@Component({
  selector: 'app-actor',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatTableModule,
    MatIconModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss',
})
export class ClassComponent {
  private classService = inject(ClassService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<ClassComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
    },
  ) {}

  displayedColumns: string[] = ['id', 'name', 'value', 'devolution', 'actions'];
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
      devolution: this.form.controls.devolution.value as number
    };

    this.classService.saveActor(payload).subscribe({
      next: () => {
        this.snackBar.open('Ator cadastrado com sucesso', 'Fechar', {
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
        this.snackBar.open('Adicione um Ator', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  deleteActor(id: string) {
    this.classService.deleteActor(id).subscribe({
      next: () => {
        this.snackBar.open('Ator deletado com sucesso', 'Fechar', {
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
      },
      width: '200px',
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
