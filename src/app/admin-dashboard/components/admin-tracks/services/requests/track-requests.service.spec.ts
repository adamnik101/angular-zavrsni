import { TestBed } from '@angular/core/testing';

import { TrackRequestsService } from './track-requests.service';

describe('TrackRequestsService', () => {
  let service: TrackRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
