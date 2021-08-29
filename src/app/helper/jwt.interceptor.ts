import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError, switchMap, tap } from 'rxjs/operators';
import { AlertService, AuthService } from '../services';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private authService:any  ;
  refreshTokenInProgress :boolean =  false ;
  tokenRefreshedSource =  new Subject() ;
  tokenRefreshed$ =  this.tokenRefreshedSource.asObservable();
   constructor( public inj:Injector ,  private AlertService:AlertService ){
     this.authService =  inj.get(AuthService)
   }



   intercept(request:HttpRequest<any> ,next:HttpHandler):Observable<HttpEvent<any>>{


     if(sessionStorage.getItem('acccess_token')){
        request =  this.addAuthHeader(request) ;
     }
     return next.handle(request).pipe(retry(1) , catchError((err) => this.handleResponseError(err)))

   }



 private addAuthHeader(request:HttpRequest<any>){

   return request.clone({
      setHeaders:{
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
   })
 }



 handleResponseError(error, request?, next?) {
  if (error instanceof HttpErrorResponse) {
    if (!navigator.onLine) {
      this.AlertService.error(

        'Failed to connect, please check your internet connection'
      );
      return throwError(error);
    }

    switch ((<HttpErrorResponse>error).status) {
      case 401:
        this.refreshToken().pipe(
          switchMap(() => {
            request = this.addAuthHeader(request);
            return next.handle(request);
          })
        );
        break;
      case 403:

        this.AlertService.error(

          'Sorry, you are not authorized to perform this action.'
        );
        break;
      case 400:
      case 404:
      case 500:
      case 503:
      default:
                  this.AlertService.serverError();
        return throwError(error);
    }
  }
  return throwError(error);
}



refreshToken(): Observable<any> {
  if (this.refreshTokenInProgress) {
    return new Observable((observer) => {
      this.tokenRefreshed$.subscribe(() => {
        observer.next();
        observer.complete();
      });
    });
  } else {
    this.refreshTokenInProgress = true;

    return this.authService.refreshToken().pipe(
      tap(() => {
        this.refreshTokenInProgress = false;
        this.tokenRefreshedSource.next();
      }),
      catchError((err) => {
        this.refreshTokenInProgress = false;
        this.logoutUser();
        return EMPTY;
      })
    );
  }
}

logoutUser() {
  this.authService.logout();
  return EMPTY;
}
}
