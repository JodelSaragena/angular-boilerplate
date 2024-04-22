import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from '@app/_services';

import { AccountService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    interceptor(request: HttpRequest<any>, next:HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401,403].includes(err.status) && this.accountService.accountvakue) {
                //auto logout if 401 or 403 response retrurned from api
                this.accountService.logout();
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(error);
            return throwError(error);
        }))
    }
}
