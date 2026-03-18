import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(private location: Location) {}

  goBack(){
    this.location.back();
  }

}
