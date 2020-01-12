import { Injectable } from '@angular/core';
import {AutoType, ClimbType, Height, Speed, Team, TeamMember} from '../../objects/pit-classes';

@Injectable({
  providedIn: 'root'
})
export class DataInputService {

  constructor() { }

  public getAutoTypes(): AutoType[] {
    const autoTypes: AutoType[] = [];

    const types: string[] = ['N/A', 'Autonomous', 'Manual', 'Hybrid'];
    types.forEach((t: string, i: number) => {
      const a: AutoType = new AutoType();
      a.id = i;
      a.type = t;
      autoTypes.push(a);
    });
    return autoTypes;

  }

  public getClimbTypes(): ClimbType[] {
    const climbTypes: ClimbType[] = [];
    const types: string[] = ['Climb Self Only', 'Climb Self, Room for Others',
      'Assist 1 Other Climb', 'Assist 2 Others Climb',
      'Climb Self, Assist 1 Other', 'Climb Self, Assist 2 Others'];

    types.forEach((t: string, i: number) => {
      const climbType: ClimbType = new ClimbType();
      climbType.id = i;
      climbType.name = t;
      climbTypes.push(climbType);
    });
    return climbTypes;
  }

  public getSpeeds(): Speed[] {
    const speeds: Speed[] = [];
    const types: string[] = ['Slow (>7 sec)', 'Med (3-7 sec)', 'Fast (<3 sec)', 'None'];

    types.forEach((t: string, i: number) => {
      const s: Speed = new Speed();
      s.id = i;
      s.name = t;
      speeds.push(s);
    });
    return speeds;
  }

  public getHeights(): Height[] {
    const heights: Height[] = [];
    const types: string[] = ['N/A', 'Low', 'Mid', 'High'];
    types.forEach((t, i) => {
      const height: Height = new Height();
      height.id = i;
      height.name = t;
      heights.push(height);
    });
    return heights;
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


