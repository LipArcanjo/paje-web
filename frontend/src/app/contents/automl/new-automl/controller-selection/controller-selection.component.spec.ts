import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerSelectionComponent } from './controller-selection.component';

describe('ControllerSelectionComponent', () => {
  let component: ControllerSelectionComponent;
  let fixture: ComponentFixture<ControllerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
