import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RankingsPage } from './rankings.page';

describe('RankingsPage', () => {
  let component: RankingsPage;
  let fixture: ComponentFixture<RankingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
