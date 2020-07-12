import { TestBed } from '@angular/core/testing';

import { NewAutomlService } from './new-automl.service';

describe('NewAutomlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewAutomlService = TestBed.get(NewAutomlService);
    expect(service).toBeTruthy();
  });
});
