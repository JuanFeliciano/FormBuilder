import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { TokenService } from 'src/app/services/TokenService/token.service';
import { RefreshService } from 'src/app/services/RefreshService/refresh.service';

@Injectable()
export class InterceptorHttp implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(
    private tokenService: TokenService,
    private refreshService: RefreshService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getAcessToken();

    if (token) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !authReq.url.includes('Login')) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }

  private addTokenHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.tokenService.getRefreshToken();
      if (refreshToken) {
        return this.refreshService.RefreshToken().pipe(
          switchMap((tokenData) => {
            this.isRefreshing = false;
            this.tokenService.setTokens(
              tokenData.accessToken,
              tokenData.refreshToken
            );
            this.refreshTokenSubject.next(tokenData.accessToken);
            return next.handle(
              this.addTokenHeader(request, tokenData.accessToken)
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.tokenService.clearStorage();
            return throwError(err);
          })
        );
      }
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token!)))
      );
    }
    return throwError('Refresh token is missing');
  }
}
