import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAutomlComponent } from './new-automl.component';

describe('NewAutomlComponent', () => {
  let component: NewAutomlComponent;
  let fixture: ComponentFixture<NewAutomlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAutomlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAutomlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
