import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItoComponent } from './ito.component';

describe('ItoComponent', () => {
  let component: ItoComponent;
  let fixture: ComponentFixture<ItoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
