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
import { ItemService } from '../../service/item.service';
import { ItemPayload } from '../../models/item';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit',
  imports: [
    MatDialogContent,
    MatButton,
    MatFormFieldModule,
    MatDatepickerModule,
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
  private itemService = inject(ItemService);
  actorId = input<string>('');

  form = new FormGroup({
    numSerie: new FormControl<number>(0, { validators: [Validators.required] }),
    aquisicaoDate: new FormControl<Date>(new Date(), { validators: [Validators.required] }),
    itemType: new FormControl<number>(0, { validators: [Validators.required] }),
  });


  onSubmit() {
    console.log(this.data);
    const payload: ItemPayload = {
      numSerie: this.form.controls.numSerie.value as number,
      aquisicaoDate: this.form.controls.aquisicaoDate.value as Date,
      itemType: this.form.controls.itemType as unknown as number
    };
    this.itemService.updateItem(this.data.id, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
    });
   }
}
