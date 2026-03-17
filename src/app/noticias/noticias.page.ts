import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class NoticiasPage {

  constructor(private location: Location){}

  goBack(){
    this.location.back();
  }
}
