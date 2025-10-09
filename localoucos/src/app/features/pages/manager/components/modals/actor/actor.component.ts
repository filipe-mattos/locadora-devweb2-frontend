import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatButton } from "@angular/material/button";

export interface PeriodicElement {
  name: string;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Filipe'},
  {id: 2, name: 'Filipinho'},
  {id: 3, name: 'Filipao'},

];


@Component({
  selector: 'app-actor',
  imports: [MatDialogContent, MatDialogActions, MatTableModule, MatIconModule, MatButton],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})

export class Actor {
delete() {
console.log("delete");
}
edit() {
console.log("edit");
}

displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = ELEMENT_DATA;

onSubmit() {
console.log("onSubmit");
}
onCancel() {
console.log("onCancel");
}

}
