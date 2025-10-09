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
import { ActorService } from '../../service/actor.service';
import { ActorPayload } from '../../models/actor';
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
  private actorService = inject(ActorService);
  actorId = input<string>('');

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
  });

  onSubmit() {
    console.log(this.data);
    const payload: ActorPayload = {
      name: this.form.controls.name.value as string,
    };
    this.actorService.updateActor(this.data.id, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
    });
  }
}
