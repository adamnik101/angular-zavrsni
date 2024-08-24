import { TestBed } from '@angular/core/testing';

import { TrackFormService } from './track-form.service';

describe('TrackFormService', () => {
  let service: TrackFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
