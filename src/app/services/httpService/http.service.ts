import { Injectable } from '@angular/core';
import {from, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoggerService} from '../loggerService/logger.service';
import {Post, ReturnJson} from '../../objects/http-object';
import {environment} from '../../../environments/environment';
import {Platform} from '@ionic/angular';
import {mergeMap} from 'rxjs/operators';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private blueAllianceReadKey = environment.blueAlliance.readKey;
  private device = 'web';

  constructor(
      private cordovaHttp: HTTP,
      private logger: LoggerService,
      private http: HttpClient,
      public platform: Platform
  ) {

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.logger.debug('EnvironmentService, We are on a mobile device');
        this.device = 'mobile';
      } else {
        this.logger.debug('EnvironmentService, We are in a web browser');
        this.device = 'web';
      }
    });

  }

  public httpPost(query: Post, url: string): Observable<ReturnJson> {
    if (this.device === 'mobile') {
      return this.cordovaHttpPost(query, url);
    } else {
      return this.webPost(query, url);
    }

  }

  private cordovaHttpPost(query: object, url: string): Observable<ReturnJson> {
    this.logger.debug('HttpService, cordovaHttpPost, query: ', query);
    this.logger.debug('HttpService, cordovaHttpPost, url: ', url);

    // this.cordovaHttp.setHeader(url, 'Content-type', 'application/json');
    this.cordovaHttp.setDataSerializer('json');
    // this.cordovaHttp.setHeader(url, 'Authorization', `Bearer ${this.authObject.accessToken}`);
    // this.cordovaHttp.setHeader(url, 'Id-token', `${this.authObject.idToken}`);

    // this.logger.max('HttpService, cordovaHttpPost, authQuery: ', authQuery);
    url = `${environment.url.base}${url}`;
    // return from(this.cordovaHttp.post(url, {}, this.cordovaHttp.getHeaders(url)))
    return from(this.cordovaHttp.post(url, query, {}))
        .pipe(mergeMap(result => {
          this.logger.max('httpService, cordovaPost, cordovaHttp result: ', result);
          const r: ReturnJson = JSON.parse(result['data']);
          return of(r);
        }));
  }

  public httpGetBlueAlliance(endPoint: string): Observable<any> {

    if (this.device === 'web') {

      const httpOptionsAuth = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          'X-TBA-Auth-Key': this.blueAllianceReadKey
        })
      };
      const url = `${environment.blueAlliance.apiUrl}/${endPoint}`;
      this.logger.max('HttpService, httpGetBlueAlliance: ', endPoint, httpOptionsAuth);
      return this.http.get(url, httpOptionsAuth);
    } else {
      return this.httpGetBlueAllianceCordova(endPoint);
    }
  }

  private httpGetBlueAllianceCordova(endPoint: string): Observable<any> {

    const url = `${environment.blueAlliance.apiUrl}/${endPoint}`;
    this.cordovaHttp.setHeader(url, 'X-TBA-Auth-Key', this.blueAllianceReadKey);

    return from(this.cordovaHttp.get(url, {}, this.cordovaHttp.getHeaders(url)))
        .pipe(mergeMap(result => {
          this.logger.max('httpService, cordovaPost, cordovaHttp result: ', result);
          const r: ReturnJson = JSON.parse(result['data']);
          return of(r);
        }));
  }

  private webPost(query: Post, url: string): Observable<any> {
    this.logger.max('HttpService, httpPost: ', `${environment.url.base}${url}`, query);
    return this.http.post<ReturnJson>(`${environment.url.base}${url}`, query);
  }

}
