import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let executeGuard: authGuard; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [authGuard], // Fournir le guard ici
    });

    executeGuard = TestBed.inject(authGuard); // Injecter le guard
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});