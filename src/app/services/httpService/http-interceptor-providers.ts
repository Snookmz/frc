import {NsInterceptor} from './http-interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: NsInterceptor, multi: true },
];
