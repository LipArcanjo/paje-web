import { TestBed } from '@angular/core/testing';

import { AutomlService } from './automl.service';

describe('AutomlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutomlService = TestBed.get(AutomlService);
    expect(service).toBeTruthy();
  });
});
