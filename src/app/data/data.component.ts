import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {Team} from '../objects/team-object';
import {FrcEvent} from '../objects/frcEvent-object';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {

  public selectedTeam: Team = new Team();
  public teams: Team[] = [];
  public events: FrcEvent[] = [];
  public teamKeys: string[] = [];

  constructor(
      private dataInputService: DataInputService,
      private logger: LoggerService,
  ) { }

  public getEvents(): void {
    this.dataInputService.getAllEventsFromApi().subscribe(result => {
      this.logger.debug('DataComponent, getEvents, result: ', result);
      this.events = result;
    })
  }

  public getTeamDetailsFromTeamKey(key: string): void {
    this.logger.max('DataComponent, getTeamDetailsFromTeamKey: ', key);
    this.dataInputService.getTeamDataFromTeamKey(key).subscribe(result => {
      this.logger.max('DataComponent, getTeamDataFromTeamKey: ', result);
      this.selectedTeam = result;
    })
  }

  public getTeamIdsForEvent(eventKey: string): void {
    this.logger.max('DataComponent, getTeamIdsForEvent: ', eventKey);
    this.dataInputService.getTeamIdsForEvent(environment.eventYear, eventKey).subscribe(result => {
      this.logger.max('DataComponent, getTeamIdsForEvent: ', result);
      this.teamKeys = Object.keys(result);
    })
  }

  public getTeams(): void {
    this.dataInputService.getTeamMembersFromApi().subscribe(result => {
      this.logger.debug('AppComponent, getTeams, getTeamMembersFromApi, result: ', result);
      this.teams = result;
      this.logger.max('AppComponent, getTeams, teams: ', this.teams);
    });
  }



  ngOnInit() {}

}
