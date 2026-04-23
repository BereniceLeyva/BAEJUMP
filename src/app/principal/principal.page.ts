import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, authState, User } from '@angular/fire/auth';
import { AlertController, IonicModule } from '@ionic/angular';
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

  // Imagen por defecto
  fotoPerfil: string = 'assets/img/avatar-default1.jpg';

  constructor(
    private auth: Auth,
    private router: Router,
    private alertCtrl: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    authState(this.auth).subscribe((user) => {
      if (user) {
        this.user = user;

        // ✅ Guardar UID (por si recarga la app)
        localStorage.setItem('playerId', user.uid);

        // Foto de perfil
        this.fotoPerfil = user.photoURL
          ? user.photoURL
          : 'assets/img/avatar-default1.jpg';

        this.cdr.detectChanges();
      } else {
        this.user = null;
        this.fotoPerfil = 'assets/img/avatar-default1.jpg';

        // 🔥 Limpieza si no hay usuario
        localStorage.removeItem('playerId');
      }
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres salir?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          cssClass: 'danger-button',
          handler: async () => {
            try {
              // 🔥 Cerrar sesión
              await signOut(this.auth);

              // 🔥 Limpiar almacenamiento
              localStorage.removeItem('playerId');

              // 🔥 Redirigir limpio
              this.router.navigateByUrl('/login', { replaceUrl: true });

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