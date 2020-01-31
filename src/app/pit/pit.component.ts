import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../services/loggerService/logger.service';
import {Pit, Team, TeamMember} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {FrcEvent} from '../objects/frcEvent-object';

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss'],
})
export class PitComponent implements OnInit {

  public events: FrcEvent[];
  public imperialUnits = false;
  public pitForm: FormGroup;
  public teams: Team[] = [];
  public teamMembers: TeamMember[] = [];
  public spinner = false;
  public successMessage = '';

  constructor(
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService
  ) {
    this.createForm();

    this.events = this.dataInputService.getEvents();
    this.teams = this.dataInputService.getTeamData();
    this.teamMembers = this.dataInputService.getTeamMembers();
  }

  private createForm(): void {
    this.logger.max('PitComponent, createForm');

    this.pitForm = this.fb.group({
      imperialUnits: [false, Validators.required],
      details: this.fb.group({
        teamMemberId: ['', Validators.required],
        eventId: ['', Validators.required],
        teamId: ['', Validators.required],
      }),
      robotStats: this.fb.group({
        weight: '',
        height: '',
        teamShirt: '',
        robotFront: '',
        robotSide: ''
      }),
      powerCells: this.fb.group({
        manipulate: false,
        groundIntake: false,
        highLoadingStationIntake: false,
        storageCapacity: '',
        shootingMechanism: '',
        targetLower: false,
        targetOuter: false,
        targetInner: false
      }),
      climb: this.fb.group({
        canClimb: false,
        climbType: '',
        height: '',
        secureHold: false,
        timeGrip: '',
        timeGripToClimb: '',
        tilting: false,
        climbMechanism: '',
        preferredPosition: '',
        canLevelGenerator: false,
        levelSelf: false,
        levelOther: false,
        repositionWhileHanging: false,
        canBuddyClimb: false,
        buddies: '',
      }),
      controlPanel: this.fb.group({
        canManipulateControlPanel: false,
        brakes: false,
        positionControl: false,
        rotationControl: false,
        sensor: false,
        notes: ''
      }),
      auto: this.fb.group({
        canAuto: false,
        line: false,
        canShoot: false,
        balls: 0,
        pickup: 0
      }),
      record: this.fb.group({
        created: '',
        modified: '',
        deviceName: ''
      })
    });

  }


  public convertValuesToPitClass(values: any): Pit {
    const p: Pit = new Pit();

    this.logger.max('PitComponent, convertValuesToPitClass: ', p);

    return p;
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

  private onChanges(): void {
    this.pitForm.get('imperialUnits').valueChanges.subscribe(val => {
      this.logger.max('PitComponent, onChanges, imperialUnits: ', val);
      this.imperialUnits = val;
    });
  }

  public onSubmit(): void {
    this.logger.debug('PitComponent, onSubmit, values: ', this.pitForm.value);
    this.spinner = true;

    const pit: Pit = this.convertValuesToPitClass(this.pitForm.value);
    this.dataStorageService.storePit(pit);

    this.spinner = false;
    this.successMessage = 'Pit details saved to storage';
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);


    // this.qrValue = `${JSON.stringify(this.pitForm.value)}`;
  }


  ngOnInit() {
    this.onChanges();
  }

}
