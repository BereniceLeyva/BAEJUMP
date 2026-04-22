import { Component, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Database, ref, listVal } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Personaje } from '../interfaces/interfaces';
import { PersonajeComponent } from '../componentes/personaje/personaje.component';
import { DomSanitizer } from '@angular/platform-browser';

import { EscenarioModalComponent } from '../escenario-modal/escenario-modal.component';

@Component({
  selector: 'app-lore',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './lore.page.html',
  styleUrls: ['./lore.page.scss'],
})
export class LorePage {

  private sanitizer = inject(DomSanitizer);
  private db = inject(Database);
  private modalCtrl = inject(ModalController);

  personajes$: Observable<Personaje[]>;

  constructor() {
    const personajesRef = ref(this.db, 'personajes');
    this.personajes$ = listVal(personajesRef);
  }

  // 🔥 MODAL PERSONAJES (FULLSCREEN)
  async abrirPersonaje(personaje: Personaje) {
    const modal = await this.modalCtrl.create({
      component: PersonajeComponent,
      componentProps: { personaje },
      cssClass: 'full-modal' // 👈 fullscreen
    });

    await modal.present();
  }

  // 🔥 MODAL ESCENARIOS (FULLSCREEN)
  async abrirEscenario(tipo: string) {

    const data: any = {
      origen: {
        nombre: 'Sector Perdido',
        imagen: 'assets/img/level1.png',
        descripcion: 'Una antigua zona industrial donde todo comenzó a fallar. Las máquinas quedaron fuera de control y los drones patrullan sin descanso, atacando a cualquiera que entre. Entre estructuras abandonadas y sistemas inestables, este lugar guarda las primeras pistas de lo que salió mal.'
      },
      codigo: {
        nombre: 'Ciudad Silenciosa',
        imagen: 'assets/img/level2.png',
        descripcion: 'Lo que antes fue una ciudad activa ahora permanece en completo silencio. No hay señales de vida… solo drones vigilando cada rincón y reaccionando ante cualquier movimiento. Las calles ocultan secretos, y cada paso te acerca a una verdad que alguien —o algo— intenta mantener oculta.'
      },
      senal: {
        nombre: 'El Núcleo',
        imagen: 'assets/img/level3.png',
        descripcion: 'En lo más profundo del sistema se encuentra el origen de todo. Aquí, las máquinas operan con un propósito desconocido, protegiendo el corazón que las controla. Cada enfrentamiento es más intenso, y solo avanzando podrás descubrir qué está realmente detrás de esta amenaza.'
      }
    };

    const modal = await this.modalCtrl.create({
      component: EscenarioModalComponent,
      componentProps: {
        escenario: data[tipo]
      },
      cssClass: 'full-modal' // 👈 fullscreen
    });

    await modal.present();
  }

  // 🔙 BOTÓN REGRESAR
  goBack() {
    window.history.back();
  }
}