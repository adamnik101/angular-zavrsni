import { TestBed } from '@angular/core/testing';

import { TrackSelectionService } from './track-selection.service';

describe('TrackSelectionService', () => {
  let service: TrackSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
