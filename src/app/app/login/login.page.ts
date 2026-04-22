import { Component, NgZone, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
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
    // Escucha permanente: Si hay usuario, mándalo a inicio
    authState(this.auth).subscribe(user => {
      if (user) {
        this.navigateToHome();
      }
    });
  }

  async loginWithGoogle() {
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...',
      duration: 5000 // Seguridad por si el popup se queda colgado
    });
    await loading.present();

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      // El Popup resolvió el problema de compatibilidad con Cordova
      const result = await signInWithPopup(this.auth, provider);
      
      if (result.user) {
        console.log('Login exitoso:', result.user.email);
        this.navigateToHome();
      }
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
    } catch (error: any) {
      this.handleAuthError(error.code);
    } finally {
      loading.dismiss();
    }
  }

  private navigateToHome() {
    this.zone.run(() => {
      // Usamos navigateByUrl con replaceUrl para limpiar el historial de navegación
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