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
import { ClassService } from '../../service/class.service';
import { ClassPayload } from '../../models/class';
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
  private actorService = inject(ClassService);
  actorId = input<string>('');

  form = new FormGroup({
    name: new FormControl<string>('', { validators: [Validators.required] }),
    value: new FormControl<number>(0, { validators: [Validators.required] }),
    devolution: new FormControl<number>(0, { validators: [Validators.required] }),
  });

  ngOnInit(){
    this.loadForm();
  }

  loadForm(){
    this.actorService.findActorById(this.data.id).subscribe({
      next: (classe) => {
         this.form.patchValue(classe)
      }
    })
  }

  onSubmit() {
    console.log(this.data);
    const payload: ClassPayload = {
      name: this.form.controls.name.value as string,
      value: this.form.controls.value.value as number,
      return_date: this.form.controls.devolution.value as number,
    };
    this.actorService.updateActor(this.data.id, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
    });
  }
}
