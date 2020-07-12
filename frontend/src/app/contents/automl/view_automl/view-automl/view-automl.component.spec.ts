import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAutomlComponent } from './view-automl.component';

describe('ViewAutomlComponent', () => {
  let component: ViewAutomlComponent;
  let fixture: ComponentFixture<ViewAutomlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAutomlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAutomlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
