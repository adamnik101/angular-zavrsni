import { TestBed } from '@angular/core/testing';

import { AlbumsTrendingService } from './albums-trending.service';

describe('AlbumsTrendingService', () => {
  let service: AlbumsTrendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumsTrendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
