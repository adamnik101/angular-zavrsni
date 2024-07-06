import { TestBed } from '@angular/core/testing';

import { UserPlaylistsService } from './user-playlists.service';

describe('UserPlaylistsService', () => {
  let service: UserPlaylistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPlaylistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
