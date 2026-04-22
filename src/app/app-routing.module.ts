import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Al abrir la app, te manda al login
    pathMatch: 'full'
  },
  {
    path: 'login',
    // Si tu login es Standalone usa loadComponent, si tiene módulo usa loadChildren
    // Probaremos con loadComponent que es lo que Angular moderno prefiere
    loadComponent: () => import('./app/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./app/nosotros/nosotros.module').then(m => m.NosotrosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}