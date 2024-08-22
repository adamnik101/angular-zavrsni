import { TestBed } from '@angular/core/testing';

import { AdminTracksTableService } from './admin-tracks-table.service';

describe('AdminTracksTableService', () => {
  let service: AdminTracksTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTracksTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
