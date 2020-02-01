import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../services/loggerService/logger.service';
import {Pit, TeamMember} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {FrcEvent} from '../objects/frcEvent-object';
import {Team} from '../objects/team-object';

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
        groundIntake: {value: false, disabled: true},
        highLoadingStationIntake: {value: false, disabled: true},
        storageCapacity: {value: '', disabled: true},
        shootingMechanism: {value: '', disabled: true},
        targetLower: {value: false, disabled: true},
        targetOuter: {value: false, disabled: true},
        targetInner: {value: false, disabled: true}
      }),
      climb: this.fb.group({
        canClimb: false,
        climbType: {value: '', disabled: true},
        height: {value: '', disabled: true},
        secureHold: {value: false, disabled: true},
        timeGrip: {value: '', disabled: true},
        timeGripToClimb: {value: '', disabled: true},
        tilting: {value: false, disabled: true},
        climbMechanism: {value: '', disabled: true},
        preferredPosition: {value: '', disabled: true},
        canLevelGenerator: {value: false, disabled: true},
        levelSelf: {value: false, disabled: true},
        levelOther: {value: false, disabled: true},
        repositionWhileHanging: {value: false, disabled: true},
        canBuddyClimb: {value: false, disabled: true},
        buddies: {value: '', disabled: true},
      }),
      controlPanel: this.fb.group({
        canManipulateControlPanel: false,
        brakes: {value: false, disabled: true},
        positionControl: {value: false, disabled: true},
        rotationControl: {value: false, disabled: true},
        sensor: {value: false, disabled: true},
        notes: {value: '', disabled: true}
      }),
      auto: this.fb.group({
        canAuto: false,
        line: {value: false, disabled: true},
        canShoot: {value: false, disabled: true},
        balls: {value: 0, disabled: true},
        pickup: {value: 0, disabled: true}
      }),
      record: this.fb.group({
        created: '',
        modified: '',
        deviceName: ''
      })
    });

  }


  public convertValuesToPitClass(v: any): Pit {
    const p: Pit = new Pit();
    this.logger.max('PitComponent, convertValuesToPitClass: ', v);
    p.imperialUnits = v.imperialUnits;
    p.details.teamMember = this.getTeamMemberFromId(v.details.teamMemberId);
    p.details.team = this.getTeamFromTeamId(v.details.teamId);
    p.details.event = this.getEventFromEventId(v.details.eventId);

    p.robotStats.weight = v.robotStats.weight;
    p.robotStats.height = v.robotStats.height;
    p.robotStats.teamShirt = v.robotStats.teamShirt;
    p.robotStats.robotFront = v.robotStats.robotFront;
    p.robotStats.robotSide = v.robotStats.robotSide;

    p.powerCells.manipulate = v.powerCells.manipulate;
    if (p.powerCells.manipulate) {
      p.powerCells.groundIntake = v.powerCells.groundIntake;
      p.powerCells.highLoadingStationIntake = v.powerCells.highLoadingStationIntake;
      p.powerCells.storageCapacity = v.powerCells.storageCapacity;
      p.powerCells.shootingMechanism = v.powerCells.shootingMechanism;
      p.powerCells.targetLower = v.powerCells.targetLower;
      p.powerCells.targetOuter = v.powerCells.targetOuter;
      p.powerCells.targetInner = v.powerCells.targetInner;
    }

    p.climb.canClimb = v.climb.canClimb;
    if (p.climb.canClimb) {
      p.climb.climbType = v.climb.climbType;
      p.climb.height = v.climb.height;
      p.climb.timeGrip = v.climb.timeGrip;
      p.climb.timeGripToClimb = v.climb.timeGripToClimb;
      p.climb.tilting = v.climb.tilting;
      p.climb.climbMechanism = v.climb.climbMechanism;
      p.climb.preferredPosition = v.climb.preferredPosition;
      p.climb.canLevelGenerator = v.climb.canLevelGenerator;
      if (p.climb.canLevelGenerator) {
        p.climb.levelSelf = v.climb.levelSelf;
        p.climb.levelOther = v.climb.levelOther;
        p.climb.repositionWhileHanging = v.climb.repositionWhileHanging;
      }
      p.climb.canBuddyClimb = v.climb.canBuddyClimb;
      if (p.climb.canBuddyClimb) {
        p.climb.buddies = v.climb.buddies;
      }
    }

    p.controlPanel.canManipulateControlPanel = v.controlPanel.canManipulateControlPanel;
    if (p.controlPanel.canManipulateControlPanel) {
      p.controlPanel.brakes = v.controlPanel.brakes;
      p.controlPanel.positionControl = v.controlPanel.positionControl;
      p.controlPanel.rotationControl = v.controlPanel.rotationControl;
      p.controlPanel.sensor = v.controlPanel.sensor;
      p.controlPanel.notes = v.controlPanel.notes;
    }

    p.auto.canAuto = v.auto.canAuto;
    if (p.auto.canAuto) {
      p.auto.line = v.auto.line;
      p.auto.canShoot = v.auto.canShoot;
      if (p.auto.canShoot) {
        p.auto.balls = v.auto.balls;
        p.auto.pickup = v.auto.pickup;
      }
    }

    if (v.record.created === '') {
      p.record.created = new Date().toString();
    } else {
      p.record.created = v.record.created;
    }

    p.record.modified = new Date().toString();

    this.logger.max('PitComponent, convertValuesToPitClasses, returning: ', p);
    return p;
  }

  private getEventFromEventId(id: string): FrcEvent {
    this.logger.max('PitComponent, getEventFromEventId: ', id);
    let e: FrcEvent = new FrcEvent();
    this.events.forEach(ev => {
      if (id === ev.id) {
        e = ev;
      }
    });
    return e;
  }

  private getTeamFromTeamId(id: number): Team {
    let t: Team = new Team();
    this.teams.forEach(tm => {
      if (id === tm.team_number) {
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

    this.pitForm.get('powerCells').get('manipulate').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('powerCells').get('groundIntake').enable();
        this.pitForm.get('powerCells').get('highLoadingStationIntake').enable();
        this.pitForm.get('powerCells').get('storageCapacity').enable();
        this.pitForm.get('powerCells').get('shootingMechanism').enable();
        this.pitForm.get('powerCells').get('targetLower').enable();
        this.pitForm.get('powerCells').get('targetOuter').enable();
        this.pitForm.get('powerCells').get('targetInner').enable();
      } else {
        this.pitForm.get('powerCells').get('groundIntake').disable();
        this.pitForm.get('powerCells').get('highLoadingStationIntake').disable();
        this.pitForm.get('powerCells').get('storageCapacity').disable();
        this.pitForm.get('powerCells').get('shootingMechanism').disable();
        this.pitForm.get('powerCells').get('targetLower').disable();
        this.pitForm.get('powerCells').get('targetOuter').disable();
        this.pitForm.get('powerCells').get('targetInner').disable();
      }
    });

    this.pitForm.get('climb').get('canClimb').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('climb').get('climbType').enable();
        this.pitForm.get('climb').get('height').enable();
        this.pitForm.get('climb').get('secureHold').enable();
        this.pitForm.get('climb').get('timeGrip').enable();
        this.pitForm.get('climb').get('timeGripToClimb').enable();
        this.pitForm.get('climb').get('tilting').enable();
        this.pitForm.get('climb').get('climbMechanism').enable();
        this.pitForm.get('climb').get('preferredPosition').enable();
        this.pitForm.get('climb').get('canLevelGenerator').enable();
      } else {
        this.pitForm.get('climb').get('climbType').disable();
        this.pitForm.get('climb').get('height').disable();
        this.pitForm.get('climb').get('secureHold').disable();
        this.pitForm.get('climb').get('timeGrip').disable();
        this.pitForm.get('climb').get('timeGripToClimb').disable();
        this.pitForm.get('climb').get('tilting').disable();
        this.pitForm.get('climb').get('climbMechanism').disable();
        this.pitForm.get('climb').get('preferredPosition').disable();
        this.pitForm.get('climb').get('canLevelGenerator').disable();
      }
    });

    this.pitForm.get('climb').get('canLevelGenerator').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('climb').get('levelSelf').enable();
        this.pitForm.get('climb').get('levelOther').enable();
        this.pitForm.get('climb').get('repositionWhileHanging').enable();
        this.pitForm.get('climb').get('canBuddyClimb').enable();
      } else {
        this.pitForm.get('climb').get('levelSelf').disable();
        this.pitForm.get('climb').get('levelOther').disable();
        this.pitForm.get('climb').get('repositionWhileHanging').disable();
        this.pitForm.get('climb').get('canBuddyClimb').disable();
      }
    });

    this.pitForm.get('climb').get('canBuddyClimb').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('climb').get('buddies').enable();
      } else {
        this.pitForm.get('climb').get('buddies').disable();
      }
    });

    this.pitForm.get('controlPanel').get('canManipulateControlPanel').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('controlPanel').get('brakes').enable();
        this.pitForm.get('controlPanel').get('positionControl').enable();
        this.pitForm.get('controlPanel').get('rotationControl').enable();
        this.pitForm.get('controlPanel').get('sensor').enable();
        this.pitForm.get('controlPanel').get('notes').enable();
      } else {
        this.pitForm.get('controlPanel').get('brakes').disable();
        this.pitForm.get('controlPanel').get('positionControl').disable();
        this.pitForm.get('controlPanel').get('rotationControl').disable();
        this.pitForm.get('controlPanel').get('sensor').disable();
        this.pitForm.get('controlPanel').get('notes').disable();
      }
    });

    this.pitForm.get('auto').get('canAuto').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('auto').get('line').enable();
        this.pitForm.get('auto').get('canShoot').enable();
      } else {
        this.pitForm.get('auto').get('line').disable();
        this.pitForm.get('auto').get('canShoot').disable();
      }
    });

    this.pitForm.get('auto').get('canShoot').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('auto').get('balls').enable();
        this.pitForm.get('auto').get('pickup').enable();
      } else {
        this.pitForm.get('auto').get('balls').disable();
        this.pitForm.get('auto').get('pickup').disable();
      }
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
