import { TestBed } from '@angular/core/testing';

import { FaqServicesService } from './faq-services.service';

describe('FaqServicesService', () => {
  let service: FaqServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
