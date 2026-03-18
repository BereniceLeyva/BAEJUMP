import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Database, ref, listVal } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: false,
})
export class NoticiasPage implements OnInit {

  noticias$!: Observable<Noticia[]>;

  constructor(private db: Database) {}

  ngOnInit() {
    const noticiasRef = ref(this.db, 'noticias'); // ⚡ Realtime
    this.noticias$ = listVal(noticiasRef) as Observable<Noticia[]>;
  }

}