import { TestBed } from '@angular/core/testing';

import { TracksTableRowService } from './tracks-table-row.service';

describe('TracksTableRowService', () => {
  let service: TracksTableRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracksTableRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
