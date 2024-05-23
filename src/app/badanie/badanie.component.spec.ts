import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadanieComponent } from './badanie.component';

describe('BadanieComponent', () => {
  let component: BadanieComponent;
  let fixture: ComponentFixture<BadanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadanieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
