import { TestBed } from '@angular/core/testing';

import { AdminUsersTableService } from './admin-users-table.service';

describe('AdminUsersTableService', () => {
  let service: AdminUsersTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUsersTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
