import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameUsedThemesComponent } from './game-used-themes.component';

describe('GameUsedThemesComponent', () => {
  let component: GameUsedThemesComponent;
  let fixture: ComponentFixture<GameUsedThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameUsedThemesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameUsedThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
