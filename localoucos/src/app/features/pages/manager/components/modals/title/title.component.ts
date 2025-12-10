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
import {MatSelectModule} from '@angular/material/select';
import { TitleModel, TitlePayload } from './models/title';
import { TitleService } from './service/title.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditComponent } from './modals/edit/edit.component';
import { Actor } from '../actor/actor.component';
import { ActorModel } from '../actor/models/actor';
import { Director } from '../director/director.component';
import { DirectorModel } from '../director/models/director';
import { ClassModel } from '../class/models/class';
import { ActorService } from '../actor/service/actor.service';
import { ClassService } from '../class/service/class.service';
import { DirectorService } from '../director/service/director.service';

@Component({
  selector: 'app-actor',
  imports: [
    MatDialogContent,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  { provide: MAT_DIALOG_DATA, useValue: {} },
  {provide: MatDialogRef, useValue: {Title}}
],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class Title {
  private titleService = inject(TitleService);
  private actorService = inject(ActorService);
  private classService = inject(ClassService);
  private directorService = inject(DirectorService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<Title>);

  actors: ActorModel[] = [];
  directors: DirectorModel[] = [];
  classes: ClassModel[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
    },
  ) {}

  displayedColumns: string[] = ['id', 'name', 'year', 'synopsis', 'category', 'actions'];
  dataSource: TitleModel[] = [];

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    year: new FormControl<number>(0, { validators: [Validators.required] }),
    category: new FormControl<string>('', { validators: [Validators.required] }),
    synopsis: new FormControl<string>('', { validators: [Validators.required] }),
    actorsId: new FormControl<string>('', { validators: [Validators.required] }),
    directorsId: new FormControl<string>('', { validators: [Validators.required] }),
    classId: new FormControl<string>('', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.loadData();
    this.listActors();
  }

  //Ajustar estrutura da modal para adicionar um titulo

  loadData(){
    this.actorService.listActors().subscribe({
      next: (actors) => {
        this.actors = actors;
      },
    });
    this.directorService.listActors().subscribe({
      next: (directors) => {
        this.directors = directors;
      },
    });
    this.classService.listActors().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  //adicionar chamada de api para o crud de ator

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload: TitlePayload = {
      name: this.form.controls.name.value as string,
      year: this.form.controls.year.value as number,
      synopsis: this.form.controls.synopsis.value as string,
      category: this.form.controls.category.value as string,
      movie_class_id: this.form.controls.classId.value as string,
      actor_ids: [this.form.controls.actorsId.value as string],
      director_id: this.form.controls.directorsId.value as string,
    };

    this.titleService.saveActor(payload).subscribe({
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
    this.titleService.listActors().subscribe({
      next: (titles) => {
        this.dataSource = titles;
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
    this.titleService.deleteActor(id).subscribe({
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
       maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listActors();
    });
  }
  updateActor(id: string, payload: TitlePayload) {
    //Pensar em como fazer a logica para dar update no actor direto da tabela
    this.titleService.updateActor(id, payload).subscribe({});
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
}
