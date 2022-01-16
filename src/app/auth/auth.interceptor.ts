import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {BackendService} from "../core/api/backend.service";
import {RefreshToken} from "../common/login.interface";
import {Router} from "@angular/router";
import {flatMap} from "rxjs/internal/operators";
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  JWT_TOKEN = 'JWT_TOKEN';
  REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private backendService: BackendService,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(this.JWT_TOKEN);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);

    if (!accessToken) {
      return next.handle(req);
    }

    if (req.url.includes('refresh')) {
      console.log('hello');
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${refreshToken}`),
      });

      return next.handle(newRequest).pipe(
        catchError((err: HttpErrorResponse) => {

          this.loginService.doLogout();
          this.router.navigate(['login']);

          return throwError(err);
        })
      );
    }

    const newRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    // return next.handle(newRequest);

    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          return this.backendService.refreshToken().pipe(
            flatMap((token: RefreshToken)=>{
              this.loginService.saveToken(token, this.loginService.decodeJWT(token))

              req = newRequest.clone({
                setHeaders: {
                  Authorization: "Bearer " + token.accessToken
                }
              });

              return next.handle(req);
            })
          )

        }
        return throwError(error);
      })
    )

  }

}
