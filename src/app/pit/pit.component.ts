import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoggerService} from '../services/loggerService/logger.service';
import {AutoType, ClimbType, Height, Pit, Speed, Team, TeamMember} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss'],
})
export class PitComponent implements OnInit {

  public heights: Height[] = [];
  public pitForm: FormGroup;
  public teams: Team[] = [];
  public teamMembers: TeamMember[] = [];
  public autoTypes: AutoType[] = [];
  public climbTypes: ClimbType[] = [];
  public speeds: Speed[] = [];
  public qrValue: any;

  constructor(
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService
  ) {
    this.createForm();

    this.teams = this.dataInputService.getTeamData();
    this.teamMembers = this.dataInputService.getTeamMembers();
    this.autoTypes = this.dataInputService.getAutoTypes();
    this.climbTypes = this.dataInputService.getClimbTypes();
    this.speeds = this.dataInputService.getSpeeds();
    this.heights = this.dataInputService.getHeights();
  }

  private createForm(): void {
    this.logger.max('PitComponent, createForm');

    this.pitForm = this.fb.group({
      header: this.fb.group({
        teamMemberId: '',
        event: '',
      }),
      detail: this.fb.group({
        teamId: '',
        teamMemberId: '',
        computerName: '',
        dtCreation: ''
      }),
      hatches: this.fb.group({
        canManipulate: false,
        floorIntake: false,
        deliverLowLevel: false,
        deliverMidLevel: false,
        deliverHighLevel: false,
        notes: ''
      }),
      cargo: this.fb.group({
        canManipulate: false,
        floorIntake: false,
        exchangeIntake: false,
        deliverLowLevel: false,
        deliverMidLevel: false,
        deliverHighLevel: false,
        notes: ''
      }),
      sandstorm: this.fb.group({
        sandstormMode: false,
        control: '',
        maxHAB: '',
        deliverHatch: false,
        maxHatches: '',
        maxHatchHeight: '',
        deliverCargo: false,
        maxCargo: '',
        maxCargoHeight: ''
      }),
      climb: this.fb.group({
        canClimb: false,
        type: '',
        grabSpeed: '',
        climbSpeed: '',
        maxHeight: ''
      }),
      image: this.fb.group({
        front: '',
        side: ''
      }),
      notes: ''
    });

  }

  public onSubmit(): void {
    this.logger.debug('PitComponent, onSubmit, values: ', this.pitForm.value);

    const pit: Pit = this.convertValuesToPitClass(this.pitForm.value);
    this.dataStorageService.storePit(pit);

    // this.qrValue = `${JSON.stringify(this.pitForm.value)}`;
  }

  public convertValuesToPitClass(values: any): Pit {
    const p: Pit = new Pit();

    p.header.teamMember = this.getTeamMemberFromId(values.header.teamMemberId);
    p.header.event = values.header.event;

    p.detail.team = this.getTeamFromTeamId(values.detail.teamId);
    p.detail.teamMember = this.getTeamMemberFromId(values.detail.teamMemberId);
    p.detail.computerName = values.detail.computerName;
    p.detail.dtCreation = values.detail.dtCreation;

    p.hatches.canManipulate = values.hatches.canManipulate;
    p.hatches.floorIntake = values.hatches.floorIntake;
    p.hatches.deliverLowLevel = values.hatches.deliverLowLevel;
    p.hatches.deliverMidLevel = values.hatches.deliverMidLevel;
    p.hatches.deliverHighLevel = values.hatches.deliverHighLevel;
    p.hatches.notes = values.hatches.notes;

    p.cargo.canManipulate = values.cargo.canManipulate;
    p.cargo.floorIntake = values.cargo.floorIntake;
    p.cargo.exchangeIntake = values.cargo.exchangeIntake;
    p.cargo.deliverLowLevel = values.cargo.deliverLowLevel;
    p.cargo.deliverMidLevel = values.cargo.deliverMidLevel;
    p.cargo.deliverHighLevel = values.cargo.deliverHighLevel;
    p.cargo.notes = values.cargo.notes;

    p.sandstorm.sandstormMode = values.sandstorm.sandstormMode;
    p.sandstorm.maxCargoHeight = values.sandstorm.cargo;
    p.sandstorm.maxHAB = this.getHeightFromHeightId(values.sandstorm.maxHAB);
    p.sandstorm.deliverHatch = values.sandstorm.deliverHatch;
    p.sandstorm.maxHatches = values.sandstorm.maxHatches;
    p.sandstorm.maxHatchHeight = this.getHeightFromHeightId(values.sandstorm.maxHatchHeight);
    p.sandstorm.deliverCargo = values.sandstorm.deliverCargo;
    p.sandstorm.maxCargo = values.sandstorm.maxCargo;
    p.sandstorm.maxCargoHeight = this.getHeightFromHeightId(values.sandstorm.maxCargoHeight);

    p.climb.canClimb = values.climb.canClimb;
    p.climb.type = values.climb.type;
    p.climb.grabSpeed = this.getSpeedFromSpeedId(values.climb.grabSpeed);
    p.climb.climbSpeed = this.getSpeedFromSpeedId(values.climb.climbSpeed);
    p.climb.maxHeight = values.climb.maxHeight;

    p.image.front = values.image.front;
    p.image.side = values.image.side;

    p.notes = values.notes;

    this.logger.max('PitComponent, convertValuesToPitClass: ', p);

    return p;
  }

  private getHeightFromHeightId(id: number): Height {
    let h: Height = new Height();
    this.heights.forEach(tm => {
      if (id === tm.id) {
        h = tm;
      }
    });
    return h;
  }

  private getSpeedFromSpeedId(id: number): Speed {
    let s: Speed = new Speed();
    this.speeds.forEach(sp => {
      if (sp.id === id) {
        s = sp;
      }
    });
    return s;
  }

  private getTeamFromTeamId(id: number): Team {
    let t: Team = new Team();
    this.teams.forEach(tm => {
      if (id === tm.id) {
        t = tm;
      }
    });
    return t;
  }

  private getTeamMemberFromId(id: number): TeamMember {
    let t: TeamMember = new TeamMember();
    this.teamMembers.forEach(tm => {
      if (id === tm.id) {
        t = tm;
      }
    });
    return t;
  }

  ngOnInit() {}

}
