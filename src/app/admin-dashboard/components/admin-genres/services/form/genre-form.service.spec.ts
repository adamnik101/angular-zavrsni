import { TestBed } from '@angular/core/testing';

import { GenreFormService } from './genre-form.service';

describe('GenreFormService', () => {
  let service: GenreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
