import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RestClientService } from './rest-clients.service';

describe('RestClientsService', () => {
  let service: RestClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(RestClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
