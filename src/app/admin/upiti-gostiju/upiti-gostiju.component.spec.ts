import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpitiGostijuComponent } from './upiti-gostiju.component';

describe('UpitiGostijuComponent', () => {
  let component: UpitiGostijuComponent;
  let fixture: ComponentFixture<UpitiGostijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpitiGostijuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpitiGostijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
