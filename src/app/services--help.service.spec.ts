import { TestBed } from '@angular/core/testing';

import { ServicesHelpService } from './services--help.service';

describe('ServicesHelpService', () => {
  let service: ServicesHelpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
