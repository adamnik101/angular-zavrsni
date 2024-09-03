import { TestBed } from '@angular/core/testing';

import { ArtistFormService } from './artist-form.service';

describe('ArtistFormService', () => {
  let service: ArtistFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
