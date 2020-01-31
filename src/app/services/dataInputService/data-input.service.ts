import { Injectable } from '@angular/core';
import {Team, TeamMember} from '../../objects/pit-classes';
import {FrcEvent} from '../../objects/frcEvent-object';

@Injectable({
  providedIn: 'root'
})
export class DataInputService {

  constructor() { }


  public getEvents(): FrcEvent[] {
    const events: FrcEvent[] = [];
    events.push({id: '2019ausp', name: '2019 South Pacific Regional'});
    events.push({id: '2019DDU', name: '2019 Duel Down Under'});
    events.push({id: '2019gal', name: '2019 Galileo Division'});

    return events;

  }

  public getTeamData(): Team[] {
    const teams: Team[] = [];

    for (let i = 0; i < 10; i++) {
      const t: Team = new Team();
      t.id = i;
      t.name = `team  #${i}`;
      teams.push(t);
    }
    return teams;
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

}


