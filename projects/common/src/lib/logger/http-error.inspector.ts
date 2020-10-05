import { Inject, Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HTTP_ERROR_INSPECTORE_CONFIG, IHttpErrorInspectoreConfig } from './http-error.inspectore.token';
const RETRY_COUNT = 3;

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    config: IHttpErrorInspectoreConfig;

    private get retryCount(): number {
        return this.config ? this.config.retryCount || RETRY_COUNT : RETRY_COUNT;
    }
    constructor(@Inject(HTTP_ERROR_INSPECTORE_CONFIG) config: IHttpErrorInspectoreConfig) {
        this.config = config;

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(this.retryCount),
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('this is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {

                        console.log('********************************************');
                        console.log(`*******${this.config.moduleName}************`);
                        console.log('********************************************');
                        console.log('this is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}

