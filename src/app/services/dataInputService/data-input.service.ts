import { Injectable } from '@angular/core';
import {District, FrcEvent} from '../../objects/frcEvent-object';
import {Observable} from 'rxjs';
import {HttpService} from '../httpService/http.service';
import {Team} from '../../objects/team-object';
import {Match} from '../../objects/match-object';

@Injectable({
  providedIn: 'root'
})
export class DataInputService {

  constructor(
      private httpService: HttpService,
  ) { }


  public getEvents(): FrcEvent[] {
    const events: FrcEvent[] = [];
    // events.push({id: '2019ausp', name: '2019 South Pacific Regional'});
    // events.push({id: '2019DDU', name: '2019 Duel Down Under'});
    // events.push({id: '2019gal', name: '2019 Galileo Division'});

    return events;
  }

  public getAllEventsFromApi(): Observable<FrcEvent[]> {
    const endpoint = 'events/2020';
    return this.httpService.httpGetBlueAlliance(endpoint);

  }

  public getDistrictsFromApi(): Observable<District[]> {
    const endpoint = 'districts/2020';
    return this.httpService.httpGetBlueAlliance(endpoint);
  }

  public getMatchesForEvent(eventKey: string): Observable<Match[]> {
    const endpoint = `event/${eventKey}/matches`;
    return this.httpService.httpGetBlueAlliance(endpoint);
  }

  public getTeamData(): Team[] {
    const teams: Team[] = [];

    for (let i = 0; i < 10; i++) {
      const t: Team = new Team();
      t.team_number = i;
      t.name = `team  #${i}`;
      teams.push(t);
    }
    return teams;
  }

  public getTeamIdsForEvent(year: number, eventKey: string): Observable<string[]> {
    const endpoint = `event/${year}${eventKey}/teams/statuses`;
    return this.httpService.httpGetBlueAlliance(endpoint);
  }

  public getTeamInfoFromTeamKey(key: string): Observable<Team> {
    const endpoint = `team/${key}`;
    return this.httpService.httpGetBlueAlliance(endpoint);
  }

}


