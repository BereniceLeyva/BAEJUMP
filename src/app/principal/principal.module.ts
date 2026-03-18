import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PrincipalPageRoutingModule
  ],
  declarations: [PrincipalPage]
})
export class PrincipalPageModule {}
