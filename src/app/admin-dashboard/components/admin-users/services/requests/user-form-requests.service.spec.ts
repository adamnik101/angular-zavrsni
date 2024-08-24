import { TestBed } from '@angular/core/testing';

import { UserFormRequestsService } from './user-form-requests.service';

describe('UserFormRequestsService', () => {
  let service: UserFormRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
