import { TestBed, inject } from '@angular/core/testing';

import { JobInfoService } from './job-info.service';

describe('JobInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobInfoService]
    });
  });

  it('should be created', inject([JobInfoService], (service: JobInfoService) => {
    expect(service).toBeTruthy();
  }));
});
