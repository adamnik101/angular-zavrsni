import { TestBed } from '@angular/core/testing';

import { UserAlbumLikesService } from './user-album-likes.service';

describe('UserAlbumLikesService', () => {
  let service: UserAlbumLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAlbumLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
