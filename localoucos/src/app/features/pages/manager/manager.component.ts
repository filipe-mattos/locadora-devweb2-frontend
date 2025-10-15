import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Actor } from './components/modals/actor/actor.component';
import { Director } from './components/modals/director/director.component';
import { ClassComponent } from './components/modals/class/class.component';
@Component({
  selector: 'app-manager',
  imports: [MatButtonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class Manager {
  readonly dialog = inject(MatDialog);

  openActorModal(): void {
    const dialogRef = this.dialog.open(Actor, {
      data: {
        ref: this.dialog,
      },
      width: '760px',
      minWidth: '760px',
      //closePredicate: () => true,
      //disableClose: true,
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
      width: '760px',
      minWidth: '760px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }

  openClassModal(): void {
    const dialogRef = this.dialog.open(ClassComponent, {
      data: {},
      width: '760px',
      minWidth: '760px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }
}
