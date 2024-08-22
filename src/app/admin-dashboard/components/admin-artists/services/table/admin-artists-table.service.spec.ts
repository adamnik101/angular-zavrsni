import { TestBed } from '@angular/core/testing';

import { AdminArtistsTableService } from './admin-artists-table.service';

describe('AdminArtistsTableService', () => {
  let service: AdminArtistsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminArtistsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
