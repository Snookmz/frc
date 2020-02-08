import { Injectable } from '@angular/core';
import {TeamMember} from '../../objects/pit-classes';
import {District, FrcEvent} from '../../objects/frcEvent-object';
import {Observable} from 'rxjs';
import {HttpService} from '../httpService/http.service';
import {Team} from '../../objects/team-object';
import {DataStorageService} from '../dataStorageService/data-storage.service';

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

  public getTeamDataFromTeamKey(key: string): Observable<Team> {
    const endpoint = `team/${key}`;
    return this.httpService.httpGetBlueAlliance(endpoint);
  }

  public getTeamMembers(): TeamMember[] {
    const teamMembers: TeamMember[] = [];
    const teams: Team[] = this.getTeamData();
    for (let i = 0; i < 100; i++) {
      const tm: TeamMember = new TeamMember();
      tm.id = i;
      tm.firstName = `firstName#${i}`;
      tm.lastName = `lastName#${i}`;
      tm.team = teams[Math.floor(Math.random() * teams.length) + 1];
      teamMembers.push(tm);
    }

    return teamMembers;

  }

  public getTeamMembersFromApi(): Observable<Team[]> {
    const endpoint = 'teams/1';
    return this.httpService.httpGetBlueAlliance(endpoint);
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


