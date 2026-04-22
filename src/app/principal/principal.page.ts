import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, authState, User } from '@angular/fire/auth';
import { AlertController, IonicModule } from '@ionic/angular'; // Limpiamos ModalController si no se usa aquí
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
      // IMPORTANTE: Esta clase activa los estilos neón en global.scss
      cssClass: 'custom-alert', 
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel' 
        },
        {
          text: 'Salir',
          // IMPORTANTE: Esta clase activa el color rojo neón
          cssClass: 'danger-button', 
          handler: async () => {
            try {
              await signOut(this.auth);
              this.router.navigate(['/login'], { replaceUrl: true });
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}