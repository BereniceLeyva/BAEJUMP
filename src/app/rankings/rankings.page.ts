import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.page.html',
  styleUrls: ['./rankings.page.scss'],
  standalone: false,
})
export class RankingsPage {

  constructor(private location: Location) {}

  goBack(){
    this.location.back();
  }

}
