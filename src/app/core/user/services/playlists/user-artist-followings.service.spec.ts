import { TestBed } from '@angular/core/testing';

import { UserArtistFollowingsService } from './user-artist-followings.service';

describe('UserArtistFollowingsService', () => {
  let service: UserArtistFollowingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserArtistFollowingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
