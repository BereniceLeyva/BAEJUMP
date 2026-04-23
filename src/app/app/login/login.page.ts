import { Component, NgZone, inject, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { 
  Auth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  authState 
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  email = '';
  password = '';

  private auth = inject(Auth);
  private router = inject(Router);
  private zone = inject(NgZone);
  private injector = inject(EnvironmentInjector);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  constructor() {
    // 🔥 Manejo global del usuario autenticado
    authState(this.auth).subscribe(user => {
      if (user) {
        // ✅ Guardar UID en localStorage
        localStorage.setItem('playerId', user.uid);

        // Redirigir al home
        this.navigateToHome();
      }
    });
  }

  async loginWithGoogle() {
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...',
      duration: 5000
    });
    await loading.present();

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      await signInWithPopup(this.auth, provider);
      // ❌ Ya no guardamos aquí, authState se encarga
    } catch (error: any) {
      console.error('Error en Google Login:', error.code);
      this.handleAuthError(error.code);
    } finally {
      loading.dismiss();
    }
  }

  async onLogin() {
    if (!this.email || !this.password) {
      this.presentToast('Completa los campos', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Entrando...' });
    await loading.present();

    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      // ❌ Tampoco aquí, authState lo maneja
    } catch (error: any) {
      this.handleAuthError(error.code);
    } finally {
      loading.dismiss();
    }
  }

  private navigateToHome() {
    this.zone.run(() => {
      this.router.navigateByUrl('/principal/inicio', { replaceUrl: true });
    });
  }

  private handleAuthError(code: string) {
    let mensaje = 'Error de conexión';
    if (code === 'auth/popup-closed-by-user') mensaje = 'Cerraste la ventana de Google';
    if (code === 'auth/wrong-password') mensaje = 'Contraseña incorrecta';
    if (code === 'auth/user-not-found') mensaje = 'Usuario no registrado';
    
    this.presentToast(mensaje, 'danger');
  }

  async presentToast(msj: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 2500,
      color: color
    });
    await toast.present();
  }
}