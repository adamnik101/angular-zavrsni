import { TestBed } from '@angular/core/testing';

import { TracksNewReleasesService } from './tracks-new-releases.service';

describe('TracksNewReleasesService', () => {
  let service: TracksNewReleasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracksNewReleasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
