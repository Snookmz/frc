import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {concatMap, delay, retryWhen, tap} from 'rxjs/operators';

import {Observable, of, throwError} from 'rxjs';
import {LoggerService} from '../loggerService/logger.service';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../authenticationService/authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class NsInterceptor implements HttpInterceptor {

    // private newMemberRequestAlreadySent = false;

    constructor(
        private authService: AuthenticationService,
        private logger: LoggerService,
        // private httpService: HttpService,
        private router: Router,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.logger.max('NsInterceptor, request: ', req);

        req.body.sessionId = this.authService.getSessionId();

        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
                this.logger.max('NsInterceptor, event: ', event);
                if (event instanceof HttpResponse) {
                    if (event.status !== 200) {
                        this.logger.max('NsInterceptor, non-200 status, event: ', event);
                    }
                }
                return event;
            }),
            retryWhen(errors => errors.pipe(
                concatMap((error, count) => {
                    this.logger.max('NsInterceptor, intercept, concatMap, error: ', error);
                    if (error.status === 0) {
                        this.logger.error('NsInterceptor, unknown error, unable to contact server', error);
                        return throwError(error);
                    } else if (error.error.message.includes('no user with that session')) {
                        this.authService.clearSessionId();
                        this.router.navigate(['/login']).catch(reason => {
                            this.logger.error('NsInterceptor, retryWhen error: ', reason);
                        });
                        // if (!this.newMemberRequestAlreadySent) {
                        //     this.handleSignUpRequest();
                        // }
                    } else if (error.error.message.includes('email not verified')) {
                        this.logger.error('NsInterceptor, email not verified error', error.error.message);
                        this.router.navigate(['/verify']).catch(reason => {
                            this.logger.error('NsInterceptor, failed to redirect to /verify: ', reason);
                        });
                        return throwError(error.error);
                    } else if (error.error.message.includes('invalid session_id')) {
                        this.logger.error('NsInterceptor, invalid session_id, log user out: ', error.error);
                        this.authService.clearSessionId();
                    }

                    if (count < environment.httpRefreshTries && (error.status === 400)) {
                        this.logger.error('NsInterceptor, 400 code error, retrying request count: ', count, error);
                        return this.returnOfError(error);
                        // return of(error);
                    } else {
                        this.logger.error('NsInterceptor, error count > 3 or matched error, returning error: ', count, error);
                        return this.returnThrowError(count, error);
                        // return throwError(error.error);
                    }
                }),
                delay(environment.httpRefreshDelay)
            ))
        );
    }

    public returnOfError(error: any): Observable<any> {
        this.logger.error('NsInterceptor, returnOfError, error: ', error);
        return of(error);
    }

    public returnThrowError(count: number, error: any): Observable<never> {
        this.logger.max('NsInterceptor, returnThrowError, count: ', count);
        return throwError(error.error);
    }

    // public handleSignUpRequest(): void {
    //     this.logger.max('NsIntercept, handleSignUpRequest,  no member error, send signup');
    //     this.newMemberRequestAlreadySent = true;
    //     this.httpService.sendSignUpRequest().subscribe( result => {
    //         this.logger.max('NsInterceptor, sendSignUpRequest, result: ', result);
    //         localStorage.setItem('email_verified', 'false');
    //     });
    // }

}
