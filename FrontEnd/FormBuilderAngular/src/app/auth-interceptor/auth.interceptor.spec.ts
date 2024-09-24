import { TestBed } from '@angular/core/testing';

import { InterceptorHttp } from './auth.interceptor';

describe('AuthInterceptorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [InterceptorHttp],
    })
  );

  it('should be created', () => {
    const interceptor: InterceptorHttp = TestBed.inject(InterceptorHttp);
    expect(interceptor).toBeTruthy();
  });
});
