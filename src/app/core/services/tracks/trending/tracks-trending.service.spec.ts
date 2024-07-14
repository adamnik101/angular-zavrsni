import { TestBed } from '@angular/core/testing';

import { TracksTrendingService } from './tracks-trending.service';

describe('TracksTrendingService', () => {
  let service: TracksTrendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracksTrendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
