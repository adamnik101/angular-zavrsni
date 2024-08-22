import { TestBed } from '@angular/core/testing';

import { AdminAlbumsTableService } from './admin-albums-table.service';

describe('AdminAlbumsTableService', () => {
  let service: AdminAlbumsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAlbumsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
