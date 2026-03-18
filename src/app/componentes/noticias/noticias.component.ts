import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Database, ref, onValue } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticia } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  private _noticias = new BehaviorSubject<Noticia[]>([]);
  noticias$: Observable<Noticia[]> = this._noticias.asObservable();

  constructor(private db: Database) {}

  ngOnInit() {
    const noticiasRef = ref(this.db, 'noticias');

    onValue(noticiasRef, snapshot => {
      const data = snapshot.val();

      if (data) {
        this._noticias.next(Object.values(data));
      }
    });
  }

}