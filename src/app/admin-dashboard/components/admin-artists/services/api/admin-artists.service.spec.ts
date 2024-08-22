import { TestBed } from '@angular/core/testing';

import { AdminArtistsService } from './admin-artists.service';

describe('AdminArtistsService', () => {
  let service: AdminArtistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminArtistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
