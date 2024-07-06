import { TestBed } from '@angular/core/testing';

import { UserTrackLikesService } from './user-track-likes.service';

describe('UserTrackLikesService', () => {
  let service: UserTrackLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTrackLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
