import { ChangeDetectionStrategy, Component, Inject, inject, Injectable } from '@angular/core';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import { ItemModel, ItemPayload } from './models/item';
import { ItemService } from './service/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditComponent } from './modals/edit/edit.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { TitleModel } from '../title/models/title';
import { TitleService } from '../title/service/title.service';

@Component({
  selector: 'app-actor',
  imports: [
    MatDialogContent,
    MatTableModule,
    MatIconModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
],
  providers: [provideNativeDateAdapter(),
  { provide: MAT_DIALOG_DATA, useValue: {} },
  {provide: MatDialogRef, useValue: {Item}}
],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Item {
  private itemService = inject(ItemService);
  private titlesService = inject(TitleService);
  private snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  readonly dialogRef = inject(MatDialogRef<Item>);
  titles: TitleModel[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      ref: MatDialog;
    },
  ) {}

  displayedColumns: string[] = ['id', 'serial_number', 'acquisition_date', 'type', 'actions'];
  dataSource: ItemModel[] = [];

  
  ngOnInit() {
    this.listItems();
    this.loadTitle();
  }

  form = new FormGroup({
    serial_number: new FormControl<string>('', { validators: [Validators.required] }),
    acquisition_date: new FormControl<string | null>(null, { validators: [Validators.required] }),
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  //adicionar chamada de api para o crud de ator


  // Testar melhor nao esta salvando

  reverseStringUsingLoop(str: string): string {
    let splited = str.split('/')
    console.log(splited)
    let reversed = '';
    let formated = splited[1]
    let formated2 = splited[0]
    splited[0] = formated;
    splited[1] = formated2
    for (let i = splited.length - 1; i >= 0; i--) {
        if(i<1){
          reversed += splited[i];
        }else{
          reversed += splited[i]+'-';
        }
    }
    console.log(reversed)
    return reversed;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const date = new Date(this.form.controls.acquisition_date.value!).toLocaleDateString();
    console.log(date)
    //let formatedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    //console.log(formatedDate)
    const payload: ItemPayload = {
      serial_number: this.form.controls.serial_number.value!,
      acquisition_date: this.reverseStringUsingLoop(date),
      type: this.form.controls.type.value!,
      title_id: this.form.controls.title_id.value!
    };
    console.log(payload)
    this.itemService.saveItem(payload).subscribe({

      next: () => {
        this.snackBar.open('Item cadastrado com sucesso', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.form.reset();
        this.listItems();
      },
    });
  }

  listItems() {
    this.itemService.listItems().subscribe({
      next: (items) => {
        this.dataSource = items;
      },
      error: () => {
        this.snackBar.open('Adicione um Item', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.snackBar.open('Item deletado com sucesso', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.listItems();
      },
    });
  }

  openItemModal(id: string): void {
    console.log(id);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        ref: this.dialog,
        id,
      },
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listItems();
    });
  }
  updateItem(id: string, payload: ItemPayload) {
    //Pensar em como fazer a logica para dar update no actor direto da tabela
    this.itemService.updateItem(id, payload).subscribe({});
  }

  onCancel() {
    this.form.reset();
    this.dialogRef.close();
  }
}
