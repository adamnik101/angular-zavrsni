import { TestBed } from '@angular/core/testing';

import { AdminGenresTableService } from './admin-genres-table.service';

describe('AdminGenresTableService', () => {
  let service: AdminGenresTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGenresTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
