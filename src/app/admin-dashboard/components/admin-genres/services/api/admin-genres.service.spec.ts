import { TestBed } from '@angular/core/testing';

import { AdminGenresService } from './admin-genres.service';

describe('AdminGenresService', () => {
  let service: AdminGenresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGenresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
