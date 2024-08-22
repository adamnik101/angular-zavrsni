import { TestBed } from '@angular/core/testing';

import { AdminAlbumsService } from './admin-albums.service';

describe('AdminAlbumsService', () => {
  let service: AdminAlbumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAlbumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
