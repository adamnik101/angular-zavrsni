import { TestBed } from '@angular/core/testing';

import { ArtistsRequestsService } from './artists-requests.service';

describe('ArtistsRequestsService', () => {
  let service: ArtistsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
