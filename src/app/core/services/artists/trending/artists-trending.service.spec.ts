import { TestBed } from '@angular/core/testing';

import { ArtistsTrendingService } from './artists-trending.service';

describe('ArtistsTrendingService', () => {
  let service: ArtistsTrendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistsTrendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
