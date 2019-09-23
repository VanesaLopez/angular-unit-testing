import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });

    service = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true from isAuthenticated when there is a token', () => {
    localStorage.setItem('token', '1234');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false from isAuthenticated when there is a token', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
