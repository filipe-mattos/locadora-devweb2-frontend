import { Component, ViewChild } from '@angular/core';
import { Header } from './components/header/header';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Header,MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatListModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  // Exemplo de função para fechar o menu lateral via código
  closeSidenav() {
    this.sidenav.close();
  }

}
