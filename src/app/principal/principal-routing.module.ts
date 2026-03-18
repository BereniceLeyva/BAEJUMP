import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalPage } from './principal.page';

const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'lore',
        loadChildren: () => import('../lore/lore.module').then(m => m.LorePageModule)
      },
      {
        path: 'rankings',
        loadChildren: () => import('../rankings/rankings.module').then(m => m.RankingsPageModule)
      },
      {
        path: 'noticias',
        loadChildren: () => import('../noticias/noticias.module').then(m => m.NoticiasPageModule)
      },
      {
        path: '',
        redirectTo: '/principal/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/principal/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PrincipalPageRoutingModule {}
