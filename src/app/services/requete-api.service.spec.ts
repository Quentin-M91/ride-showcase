import { TestBed } from '@angular/core/testing';
import { RequeteApiService } from './requete-api.service';

describe('RequeteApiService', () => {
  let service: RequeteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequeteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
