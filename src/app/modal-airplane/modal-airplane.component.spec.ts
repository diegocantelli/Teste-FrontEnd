import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAirplaneComponent } from './modal-airplane.component';

describe('ModalAirplaneComponent', () => {
  let component: ModalAirplaneComponent;
  let fixture: ComponentFixture<ModalAirplaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAirplaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAirplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
