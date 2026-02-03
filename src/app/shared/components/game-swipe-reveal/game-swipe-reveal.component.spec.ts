import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSwipeRevealComponent } from './game-swipe-reveal.component';

describe('GameSwipeRevealComponent', () => {
  let component: GameSwipeRevealComponent;
  let fixture: ComponentFixture<GameSwipeRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSwipeRevealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameSwipeRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
