import { TestBed } from '@angular/core/testing';

import { AlbumFormRequestsService } from './album-form-requests.service';

describe('AlbumFormRequestsService', () => {
  let service: AlbumFormRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumFormRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
