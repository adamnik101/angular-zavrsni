import { TestBed } from '@angular/core/testing';

import { DominantColorService } from './dominant-color.service';

describe('DominantColorService', () => {
  let service: DominantColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DominantColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
