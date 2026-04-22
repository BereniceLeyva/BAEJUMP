import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  baseUrl = 'https://rankings-b5c1b-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  // 🔥 CONVERTIR A ARRAY
  getRankings() {
    return this.http.get(this.baseUrl + 'rankings.json')
      .pipe(
        map((data: any) => {

          if (!data) return [];

          return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }))
          // 🔥 ordenar por puntaje
          .sort((a, b) => b.puntaje - a.puntaje);

        })
      );
  }

  // 🔥 STATS POR JUGADOR
  getStatsJugador(id: string) {
    return this.http.get(this.baseUrl + 'jugadores/' + id + '.json');
  }
}