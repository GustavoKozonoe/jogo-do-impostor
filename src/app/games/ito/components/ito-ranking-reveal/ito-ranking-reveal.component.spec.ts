import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItoRankingRevealComponent } from './ito-ranking-reveal.component';

describe('ItoRankingRevealComponent', () => {
  let component: ItoRankingRevealComponent;
  let fixture: ComponentFixture<ItoRankingRevealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItoRankingRevealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItoRankingRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
