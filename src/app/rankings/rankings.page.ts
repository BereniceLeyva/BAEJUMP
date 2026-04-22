import { Component, OnInit, ViewEncapsulation } from '@angular/core'; // 1. Importamos ViewEncapsulation
import { RankingService } from '../services/ranking';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss'], // 2. ¡IMPORTANTE! Asegúrate de que esta línea esté aquí
  standalone: false,
  encapsulation: ViewEncapsulation.None // 3. Esto permite que tus estilos personalizados ganen
})
export class RankingsPage implements OnInit {

  rankings: any[] = [];

  constructor(private rankingService: RankingService) {}

  ngOnInit() {
    this.cargarRankings();
  }

  cargarRankings() {
    this.rankingService.getRankings().subscribe((data: any) => {
      // Usamos el operador de coalescencia para asegurar que siempre sea un array
      const rawData = data || {};
      this.rankings = Object.values(rawData);
      
      // Ordenamos por puntaje de mayor a menor
      this.rankings.sort((a: any, b: any) => (b.puntaje || 0) - (a.puntaje || 0));
    });
  }
}