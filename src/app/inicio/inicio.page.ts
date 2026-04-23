import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from '../services/ranking';
// Importamos Auth para obtener los datos del perfil
import { Auth, authState } from '@angular/fire/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {

  stats: any = {};
  playerID: string = '';
  // Variable para el nombre que verás en el HTML
  nombreUsuario: string = 'Jugador'; 

  // Inyectamos Auth usando el nuevo método inject
  private auth = inject(Auth);

  constructor(
    private router: Router,
    private rankingService: RankingService
  ) {}

  ngOnInit() {
    this.inicializarUsuario();
  }
  inicializarUsuario() {
  authState(this.auth).subscribe(user => {
    if (user) {

      // UID REAL
      this.playerID = user.uid;

      // Guardarlo para Unity
      localStorage.setItem('playerId', this.playerID);

      // Nombre
      if (user.displayName) {
        this.nombreUsuario = user.displayName.split(' ')[0];
      }

      // Cargar stats
      this.cargarStats();

    } else {
      console.warn('Usuario no autenticado');
    }
  });
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