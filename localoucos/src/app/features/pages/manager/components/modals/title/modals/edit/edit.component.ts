import { Component, Inject, inject, input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TitleService } from '../../service/title.service';
import { TitleModel, TitlePayload } from '../../models/title';
import { MatSelectModule } from "@angular/material/select";
import { ActorService } from '../../../actor/service/actor.service';
import { ClassService } from '../../../class/service/class.service';
import { DirectorService } from '../../../director/service/director.service';
import { ActorModel } from '../../../actor/models/actor';
import { DirectorModel } from '../../../director/models/director';
import { ClassModel } from '../../../class/models/class';

@Component({
  selector: 'app-edit',
  imports: [
    MatDialogContent,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
      id: string;
    },
  ) {}
  readonly dialogRef = inject(MatDialogRef<EditComponent>);
  private titleService = inject(TitleService);
    private actorService = inject(ActorService);
    private classService = inject(ClassService);
    private directorService = inject(DirectorService);
  actorId = input<string>('');
  actors: ActorModel[] = [];
    directors: DirectorModel[] = [];
    classes: ClassModel[] = [];
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
    this.loadForm();
  }

  loadForm(){
    this.titleService.findActorById(this.data.id).subscribe({
      next: (title) => {
         this.form.patchValue(title)
      }
    })
  }

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

  onSubmit() {
    console.log(this.data);
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

    this.titleService.updateActor(this.data.id, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
    });
  }
}
