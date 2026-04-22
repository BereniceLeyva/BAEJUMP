import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from '../services/ranking';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  stats: any = {};
  playerID: string = '';

  constructor(
    private router: Router,
    private rankingService: RankingService
  ) {}

  ngOnInit() {
    // 🔥 Obtener ID guardado
    this.playerID = localStorage.getItem('playerId') || '';

    if (this.playerID) {
      this.cargarStats();
    } else {
      console.warn('No hay playerId guardado');
    }
  }

  cargarStats() {
    this.rankingService.getStatsJugador(this.playerID)
      .subscribe((data: any) => {
        this.stats = data || {};
      });
  }

  irRankings(){
    this.router.navigate(['/principal/rankings']);
  }

  irNoticias(){
    this.router.navigate(['/principal/noticias']);
  }

}