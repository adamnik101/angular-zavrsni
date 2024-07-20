import { TestBed } from '@angular/core/testing';

import { PlaylistsFormService } from './playlists-form.service';

describe('PlaylistsFormService', () => {
  let service: PlaylistsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
