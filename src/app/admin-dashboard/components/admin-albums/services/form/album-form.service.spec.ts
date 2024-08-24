import { TestBed } from '@angular/core/testing';

import { AlbumFormService } from './album-form.service';

describe('AlbumFormService', () => {
  let service: AlbumFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
