import { Component, inject, Injectable } from '@angular/core';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
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
import { DirectorModel, DirectorPayload } from './models/director';
import { ActorService } from './service/director.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Filipe' },
  { id: 2, name: 'Filipinho' },
  { id: 3, name: 'Filipao' },
];

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
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss',
})
export class Director {
  private actorService = inject(ActorService);
  private snackBar = inject(MatSnackBar);

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
  });

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  delete() {
    console.log('delete');
  }

  edit() {
    console.log('edit');
  }

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = ELEMENT_DATA;
  //adicionar chamada de api para o crud de ator

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload: DirectorPayload = {
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
    //Essa funcao vai precisar popular o objeto da tabela
    this.actorService.listActors().subscribe({});
  }

  deleteActor(id: string) {
    this.actorService.deleteActor(id).subscribe({});
  }

  updateActor(id: string, payload: DirectorPayload) {
    //Pensar em como fazer a logica para dar update no actor direto da tabela
    this.actorService.updateActor(id, payload).subscribe({});
  }

  onCancel() {
    console.log('onCancel');
  }
}
