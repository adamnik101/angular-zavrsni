import { TestBed } from '@angular/core/testing';

import { TracksTableService } from './tracks-table.service';

describe('TracksTableService', () => {
  let service: TracksTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracksTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
