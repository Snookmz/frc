import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoggerService} from '../loggerService/logger.service';
import {Post, ReturnJson} from '../../objects/http-object';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private blueAllianceReadKey = environment.blueAlliance.readKey;
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

  public httpGetBlueAlliance(endPoint: string): Observable<any> {
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'X-TBA-Auth-Key': this.blueAllianceReadKey
      })
    };

    const url = `${environment.blueAlliance.apiUrl}/${endPoint}`;

    this.logger.max('HttpService, httpGetBlueAlliance: ', endPoint, httpOptionsAuth);
    return this.http.get(url, httpOptionsAuth);
  }

  private httpPostAuthenticated(query: Post, url: string): Observable<any> {
    const httpOptionsAuth = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'X-TBA-Auth-Key': this.blueAllianceReadKey
      })
    };

    this.logger.max('HttpService, httpPostAuthenticated: ', url, query, httpOptionsAuth);
    return this.http.post<ReturnJson>(url, query, httpOptionsAuth);
  }

}
