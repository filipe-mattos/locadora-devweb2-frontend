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
import { MatSelectModule } from "@angular/material/select";
import { TitleModel } from '../../../title/models/title';
import { TitleService } from '../../../title/service/title.service';

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
  private itemService = inject(ItemService);
  private titlesService = inject(TitleService);
  actorId = input<string>('');
  titles: TitleModel[] = [];

  form = new FormGroup({
    serial_number: new FormControl<string>('', { validators: [Validators.required] }),
    acquisition_date: new FormControl<Date>(new Date(), { validators: [Validators.required] }),
    type: new FormControl<string>('', { validators: [Validators.required] }),
    title_id: new FormControl<string>('', {validators: [Validators.required]}),
  });


  loadTitle(){
    this.titlesService.listActors().subscribe({
      next: (titles) => {
        this.titles = titles
      },
    })
  }

  reverseStringUsingLoop(str: string): string {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
  }

  onSubmit() {
    
    const date = new Date(this.form.controls.acquisition_date.value!).toLocaleDateString();
    console.log(date)
    console.log(this.data);
    const payload: ItemPayload = {
      serial_number: this.form.controls.serial_number.value!,
      acquisition_date: this.reverseStringUsingLoop(date),
      type: this.form.controls.type.value!,
      title_id: this.form.controls.title_id.value!
    };
    this.itemService.updateItem(this.data.id, payload).subscribe({
      next: () => {
        this.dialogRef.close();
      },
    });
   }
}
