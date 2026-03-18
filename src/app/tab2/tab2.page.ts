import { Component, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Database, ref, listVal } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Personaje } from '../interfaces/interfaces';
import { PersonajeComponent } from '../componentes/personaje/personaje.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  private sanitizer = inject(DomSanitizer);
  private db = inject(Database);
  private modalCtrl = inject(ModalController);

  personajes$: Observable<Personaje[]>;

  constructor() {
    const personajesRef = ref(this.db, 'personajes');
    this.personajes$ = listVal(personajesRef); // 🔥 AQUÍ SE ARREGLA TODO
  }

  async abrirPersonaje(personaje: Personaje) {
    const modal = await this.modalCtrl.create({
      component: PersonajeComponent,
      componentProps: { personaje },
    });
    await modal.present();
  }

  goBack() {
    window.history.back();
  }
}