import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LoggerService} from '../loggerService/logger.service';
import {HttpService} from '../httpService/http.service';
import {Post, ReturnJson} from '../../objects/http-object';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(
      private httpService: HttpService,
      private logger: LoggerService
  ) { }

  // public checkSessionId(sessionId: string): Observable<ReturnJson> {
  //   const p: Post = new Post();
  //   p.sessionId = sessionId;
  //   return this.httpService.httpPost(p, `${environment.url.base}${environment.url.checkSession}`);
  // }

  public setSessionId(sessionId: string): void {
    this.logger.max('AuthenticationService, setSessionId: ', sessionId);
    localStorage.setItem('sessionId', sessionId);
  }

  public getSessionId(): string {
    const sessionId = localStorage.getItem('sessionId');
    return sessionId;
  }

  public clearSessionId(): void {
    localStorage.removeItem('sessionId');
  }

}
