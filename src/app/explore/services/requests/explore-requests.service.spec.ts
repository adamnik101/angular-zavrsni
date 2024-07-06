import { TestBed } from '@angular/core/testing';

import { ExploreRequestsService } from './explore-requests.service';

describe('ExploreRequestsService', () => {
  let service: ExploreRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExploreRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
