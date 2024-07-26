import { TestBed } from '@angular/core/testing';

import { RecentlyPlayedService } from './recently-played.service';

describe('RecentlyPlayedService', () => {
  let service: RecentlyPlayedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyPlayedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
