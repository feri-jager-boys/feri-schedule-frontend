import { TestBed } from '@angular/core/testing';

import { ProgramDataSharingService } from './program-data-sharing.service';

describe('ProgramDataSharingService', () => {
  let service: ProgramDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
