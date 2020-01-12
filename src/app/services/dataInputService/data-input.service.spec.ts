import { TestBed } from '@angular/core/testing';

import { DataInputService } from './data-input.service';

describe('DataInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataInputService = TestBed.get(DataInputService);
    expect(service).toBeTruthy();
  });
});
