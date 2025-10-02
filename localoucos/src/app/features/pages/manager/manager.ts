import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Actor } from './components/modals/actor/actor';
import { Director } from './components/modals/director/director';
import { Class } from './components/modals/class/class';
@Component({
  selector: 'app-manager',
  imports: [MatButtonModule],
  templateUrl: './manager.html',
  styleUrl: './manager.scss'
})
export class Manager {

  readonly dialog = inject(MatDialog);

  openActorModal(): void {
    const dialogRef = this.dialog.open(Actor, {
      data: {},
      width: '760px',
      minWidth: '760px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }

  openDirectorModal(): void {
    const dialogRef = this.dialog.open(Director, {
      data: {},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }

  openClassModal(): void {
    const dialogRef = this.dialog.open(Class, {
      data: {},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }

}
