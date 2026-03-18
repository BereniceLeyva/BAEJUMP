import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage {

  constructor(private router: Router) {}

  irRankings(){
    this.router.navigate(['/principal/rankings']);
  }

  irNoticias(){
    this.router.navigate(['/principal/noticias'])
  }

}
