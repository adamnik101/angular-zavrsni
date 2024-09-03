import { TestBed } from '@angular/core/testing';

import { GenreRequestsService } from './genre-requests.service';

describe('GenreRequestsService', () => {
  let service: GenreRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
