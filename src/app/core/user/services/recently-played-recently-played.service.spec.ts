import { TestBed } from '@angular/core/testing';

import { RecentlyPlayedRecentlyPlayedService } from './recently-played-recently-played.service';

describe('RecentlyPlayedRecentlyPlayedService', () => {
  let service: RecentlyPlayedRecentlyPlayedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyPlayedRecentlyPlayedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
