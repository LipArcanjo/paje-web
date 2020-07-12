import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomlDragDropComponent } from './automl-drag-drop.component';

describe('AutomlDragDropComponent', () => {
  let component: AutomlDragDropComponent;
  let fixture: ComponentFixture<AutomlDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomlDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomlDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
