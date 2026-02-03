import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFlipCardComponent } from './game-flip-card.component';

describe('GameFlipCardComponent', () => {
  let component: GameFlipCardComponent;
  let fixture: ComponentFixture<GameFlipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameFlipCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameFlipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
