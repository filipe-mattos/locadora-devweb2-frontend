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
import { DirectorService } from '../../service/director.service';
import { DirectorPayload } from '../../models/director';

@Component({
  selector: 'app-edit',
  imports: [
    MatDialogContent,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
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
  private directorService = inject(DirectorService);
  actorId = input<string>('');

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
  });

  ngOnInit(){
    this.loadForm();
  }

  loadForm(){
    this.directorService.findActorById(this.data.id).subscribe({
      next: (director) => {
         this.form.patchValue(director)
      }
    })
  }

  onSubmit() {
    console.log(this.data);
    const payload: DirectorPayload = {
      name: this.form.controls.name.value as string,
    };
    this.directorService.updateActor(this.data.id, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
    });
  }
}
