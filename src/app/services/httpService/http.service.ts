import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoggerService} from '../loggerService/logger.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private device = 'web';

  constructor(
      private logger: LoggerService,
      private http: HttpClient
  ) { }

  public httpPost(query: Post, url: string): Observable<ReturnJson> {
    if (this.device === 'mobile') {
      // return this.cordovaHttpPost(query, url);
    } else {
      return this.httpPostAuthenticated(query, url);
    }

  }

  // private cordovaHttpPost(query: object, url: string): Observable<any> {
  //   this.logger.debug('HttpService, cordovaHttpPost, query: ', query);
  //   this.logger.debug('HttpService, cordovaHttpPost, url: ', url);
  //
  //   if (this.authObject.member.email === '') {
  //     return throwError('httpPostAuthenticated sends error: no email set in authObject');
  //   }
  //
  //   const authQuery = {
  //     email: this.authObject.member.email,
  //     json: query
  //   };
  //
  //   // this.cordovaHttp.setHeader(url, 'Content-type', 'application/json');
  //   this.cordovaHttp.setDataSerializer('json');
  //   this.cordovaHttp.setHeader(url, 'Authorization', `Bearer ${this.authObject.accessToken}`);
  //   this.cordovaHttp.setHeader(url, 'Id-token', `${this.authObject.idToken}`);
  //
  //   this.logger.max('HttpService, cordovaHttpPost, authQuery: ', authQuery);
  //
  //   return from(this.cordovaHttp.post(url, authQuery, this.cordovaHttp.getHeaders(url)))
  //       .pipe(mergeMap(result => {
  //         this.logger.max('httpService, cordovaPost, cordovaHttp result: ', result);
  //         const r: ReturnObject = JSON.parse(result['data']);
  //         return of(r);
  //       }));
  // }

  private httpPostAuthenticated(query: Post, url: string): Observable<any> {
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.logger.max('HttpService, httpPostAuthenticated: ', url, query, httpOptionsAuth);
    return this.http.post<ReturnJson>(url, query, httpOptionsAuth);
  }

}
