import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-escenario-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './escenario-modal.component.html',
  styleUrls: ['./escenario-modal.component.scss'],
})
export class EscenarioModalComponent {

  @Input() escenario: any;

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}