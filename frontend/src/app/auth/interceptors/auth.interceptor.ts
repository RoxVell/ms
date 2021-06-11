import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.authService.getToken();

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${idToken}`)
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.statusText === 'Unauthorized') {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
          return throwError(error);
        })
      );
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.statusText === 'Unauthorized') {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      })
    );
  }
}
