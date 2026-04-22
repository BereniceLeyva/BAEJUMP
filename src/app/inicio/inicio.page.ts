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
    // 1. Obtener datos del usuario de Google
    this.obtenerDatosUsuario();

    // 2. Obtener ID guardado para las estadísticas
    this.playerID = localStorage.getItem('playerId') || '';

    if (this.playerID) {
      this.cargarStats();
    } else {
      console.warn('No hay playerId guardado');
    }
  }

  obtenerDatosUsuario() {
    // Escuchamos el estado de autenticación para obtener el nombre
    authState(this.auth).subscribe(user => {
      if (user && user.displayName) {
        // Tomamos solo el primer nombre para el estilo del header
        this.nombreUsuario = user.displayName.split(' ')[0];
        console.log('Nombre cargado en inicio:', this.nombreUsuario);
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