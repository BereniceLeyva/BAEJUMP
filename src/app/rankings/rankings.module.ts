import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RankingsPage } from './rankings.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RankingsRoutingModule } from './rankings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RankingsRoutingModule
  ],
  declarations: [RankingsPage]
})
export class RankingsPageModule {}
