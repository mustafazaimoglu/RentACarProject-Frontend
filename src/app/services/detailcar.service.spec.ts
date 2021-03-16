import { TestBed } from '@angular/core/testing';

import { DetailcarService } from './detailcar.service';

describe('DetailcarService', () => {
  let service: DetailcarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailcarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
