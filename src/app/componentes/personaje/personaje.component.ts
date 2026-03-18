import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Personaje } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss'],
  standalone: true,       
  imports: [IonicModule, CommonModule], 
})
export class PersonajeComponent implements OnInit {
  @Input() personaje!: Personaje;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}