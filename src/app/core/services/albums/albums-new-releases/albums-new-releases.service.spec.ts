import { TestBed } from '@angular/core/testing';

import { AlbumsNewReleasesService } from './albums-new-releases.service';

describe('AlbumsNewReleasesService', () => {
  let service: AlbumsNewReleasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumsNewReleasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
