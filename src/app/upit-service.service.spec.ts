import { TestBed } from '@angular/core/testing';

import { UpitServiceService } from './upit-service.service';

describe('UpitServiceService', () => {
  let service: UpitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
