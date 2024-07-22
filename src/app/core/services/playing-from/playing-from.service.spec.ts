import { TestBed } from '@angular/core/testing';

import { PlayingFromService } from './playing-from.service';

describe('PlayingFromService', () => {
  let service: PlayingFromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayingFromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
