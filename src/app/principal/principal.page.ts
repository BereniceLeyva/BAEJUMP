import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, authState, User } from '@angular/fire/auth';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrincipalPage implements OnInit {
  user: User | null = null;

  constructor(
    private auth: Auth, 
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Escuchamos el estado del usuario para obtener su foto y datos
    authState(this.auth).subscribe((user) => {
      this.user = user;
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          cssClass: 'danger',
          handler: async () => {
            await signOut(this.auth);
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }
}