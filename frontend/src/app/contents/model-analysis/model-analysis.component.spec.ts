import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAnalysisComponent } from './model-analysis.component';

describe('ModelAnalysisComponent', () => {
  let component: ModelAnalysisComponent;
  let fixture: ComponentFixture<ModelAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
