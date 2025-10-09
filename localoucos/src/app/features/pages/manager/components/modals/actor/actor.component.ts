import { Component, Inject, inject, Injectable, OnInit } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
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
import { ActorModel, ActorPayload } from './models/actor';
import { ActorService } from './service/actor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditComponent } from './modals/edit/edit.component';

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
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss',
})
export class Actor implements OnInit {
  private actorService = inject(ActorService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<Actor>);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
    },
  ) {}

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: ActorModel[] = [];

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.listActors();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  delete() {
    console.log('delete');
  }

  edit() {
    console.log('edit');
  }

  //adicionar chamada de api para o crud de ator

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload: ActorPayload = {
      name: this.form.controls.name.value as string,
    };

    this.actorService.saveActor(payload).subscribe({
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
    this.actorService.listActors().subscribe({
      next: (actors) => {
        this.dataSource = actors;
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
    this.actorService.deleteActor(id).subscribe({
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
  updateActor(id: string, payload: ActorPayload) {
    //Pensar em como fazer a logica para dar update no actor direto da tabela
    this.actorService.updateActor(id, payload).subscribe({});
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
}
