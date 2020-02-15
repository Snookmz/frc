import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../services/loggerService/logger.service';
import {Pit, PitStorage, TeamMember} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {EventStorage, FrcEvent} from '../objects/frcEvent-object';
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
  public teamMembers: TeamMember[] = [];
  public spinner = false;
  public successMessage = '';
  public selectedEventStorage: EventStorage = new EventStorage();
  public selectedPitStorage: PitStorage = new PitStorage();

  constructor(
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService
  ) {
  }

  private createForm(ps?: PitStorage, teamKey?: string): void {
    this.logger.max('PitComponent, createForm');
    this.pitForm = undefined;

    if (ps === undefined) {
      ps = new PitStorage();
    }

    let powerCellsDisabled = true;
    if (ps.pit.powerCells.flCells) {
      powerCellsDisabled = false;
    }
    let climbDisabled = true;
    if (ps.pit.climb.flClimb) {
      climbDisabled = false;
    }
    let controlPanelDisabled = true;
    if (ps.pit.controlPanel.flPanel) {
      controlPanelDisabled = false;
    }
    let autoDisabled = true;
    if (ps.pit.auto.flAuto) {
      autoDisabled = false;
    }

    this.logger.max('PitComponent, createForm, powerCellsDisabled: ', JSON.stringify(powerCellsDisabled));

    this.pitForm = this.fb.group({
      imperialUnits: [ps.pit.imperialUnits, Validators.required],
      event: this.selectedEventStorage.event.event_code,
      details: this.fb.group({
        idTeam: [teamKey, Validators.required],
        // name: ['', Validators.required],
        txScoutName: [ps.pit.details.txScoutName, Validators.required],
      }),
      robotStats: this.fb.group({
        numWeight: ps.pit.robotStats.numWeight,
        numHeight: ps.pit.robotStats.numHeight,
        imgTeamUniform: ps.pit.robotStats.imgTeamUniform,
        imgRobotFront: ps.pit.robotStats.imgRobotFront,
        imgRobotSide: ps.pit.robotStats.imgRobotSide
      }),
      powerCells: this.fb.group({
        flCells: ps.pit.powerCells.flCells, // can manipulate
        flIntakeGround: {value: ps.pit.powerCells.flIntakeGround, disabled: powerCellsDisabled},
        flIntakeHigh: {value: ps.pit.powerCells.flIntakeHigh, disabled: powerCellsDisabled},
        numStorage: {value: ps.pit.powerCells.numStorage, disabled: powerCellsDisabled},
        txShooting: {value: ps.pit.powerCells.txShooting, disabled: powerCellsDisabled},
        flTargetLow: {value: ps.pit.powerCells.flTargetLow, disabled: powerCellsDisabled},
        flTargetOuter: {value: ps.pit.powerCells.flTargetOuter, disabled: powerCellsDisabled},
        flTargetInner: {value: ps.pit.powerCells.flTargetInner, disabled: powerCellsDisabled}
      }),
      climb: this.fb.group({
        flClimb: ps.pit.climb.flClimb, // can climb
        idClimbType: {value: ps.pit.climb.idClimbType, disabled: climbDisabled},
        numClimbHeight: {value: ps.pit.climb.numClimbHeight, disabled: climbDisabled},
        flClimbSecure: {value: ps.pit.climb.flClimbSecure, disabled: climbDisabled},
        idClimbGrab: {value: ps.pit.climb.idClimbGrab, disabled: climbDisabled},
        idClimbSpeed: {value: ps.pit.climb.idClimbSpeed, disabled: climbDisabled},
        flClimbTilt: {value: ps.pit.climb.flClimbTilt, disabled: climbDisabled},
        txClimb: {value: ps.pit.climb.txClimb, disabled: climbDisabled}, // climb mechanism
        idClimbPos: {value: ps.pit.climb.idClimbPos, disabled: climbDisabled},
        flClimbLevel: {value: ps.pit.climb.flClimbLevel, disabled: climbDisabled},
        flClimbLevelSelf: {value: ps.pit.climb.flClimbLevelSelf, disabled: climbDisabled},
        flClimbLevelOther: {value: ps.pit.climb.flClimbLevelOther, disabled: climbDisabled},
        flClimbMove: {value: ps.pit.climb.flClimbMove, disabled: climbDisabled},
        flClimbOther: {value: ps.pit.climb.flClimbOther, disabled: climbDisabled},
        numClimbOther: {value: ps.pit.climb.numClimbOther, disabled: climbDisabled}, // buddies
      }),
      controlPanel: this.fb.group({
        flPanel: ps.pit.controlPanel.flPanel, // can manipulate control panel
        flPanelBrake: {value: ps.pit.controlPanel.flPanelBrake, disabled: controlPanelDisabled},
        flPanelRotation: {value: ps.pit.controlPanel.flPanelRotation, disabled: controlPanelDisabled},
        flPanelPos: {value: ps.pit.controlPanel.flPanelPos, disabled: controlPanelDisabled},
        flPanelSensor: {value: ps.pit.controlPanel.flPanelSensor, disabled: controlPanelDisabled},
        txPanelSensor: {value: ps.pit.controlPanel.txPanelSensor, disabled: controlPanelDisabled} // notes
      }),
      auto: this.fb.group({
        flAuto: ps.pit.auto.flAuto, // can auto
        flAutoLine: {value: ps.pit.auto.flAutoLine, disabled: autoDisabled},
        flAutoShoot: {value: ps.pit.auto.flAutoShoot, disabled: autoDisabled},
        numAutoShoot: {value: ps.pit.auto.numAutoShoot, disabled: autoDisabled},
        numAutoLoad: {value: ps.pit.auto.numAutoLoad, disabled: autoDisabled}
      }),
      record: this.fb.group({
        dtCreated: '',
        dtModified: '',
        txComputerName: ''
      })
    });

    this.logger.max('PitComponent, createForm, returning: ', this.pitForm);
    this.onChanges();
  }


  public convertValuesToPitClass(v: any): Pit {
    const p: Pit = new Pit();
    this.logger.max('PitComponent, convertValuesToPitClass: ', v);
    p.imperialUnits = v.imperialUnits;
    p.event = v.event;
    p.details.idTeam = v.details.idTeam;
    // p.details.team = this.getTeamFromTeamId(v.details.teamId);
    p.details.name = v.details.name;
    p.details.txScoutName = v.details.txScoutName;

    p.robotStats.numWeight = v.robotStats.numWeight;
    p.robotStats.numHeight = v.robotStats.numHeight;
    p.robotStats.imgTeamUniform = v.robotStats.imgTeamUniform;
    p.robotStats.imgRobotFront = v.robotStats.imgRobotFront;
    p.robotStats.imgRobotSide = v.robotStats.imgRobotSide;

    p.powerCells.flCells = v.powerCells.flCells;
    if (p.powerCells.flCells) {
      p.powerCells.flIntakeGround = v.powerCells.flIntakeGround;
      p.powerCells.flIntakeHigh = v.powerCells.flIntakeHigh;
      p.powerCells.numStorage = v.powerCells.numStorage;
      p.powerCells.txShooting = v.powerCells.txShooting;
      p.powerCells.flTargetLow = v.powerCells.flTargetLow;
      p.powerCells.flTargetOuter = v.powerCells.flTargetOuter;
      p.powerCells.flTargetInner = v.powerCells.flTargetInner;
    }

    p.climb.flClimb = v.climb.flClimb;
    if (p.climb.flClimb) {
      p.climb.idClimbType = v.climb.idClimbType;
      p.climb.numClimbHeight = v.climb.numClimbHeight;
      p.climb.flClimbSecure = v.climb.flClimbSecure;
      p.climb.idClimbGrab = v.climb.idClimbGrab;
      p.climb.idClimbSpeed = v.climb.idClimbSpeed;
      p.climb.flClimbTilt = v.climb.flClimbTilt;
      p.climb.txClimb = v.climb.txClimb;
      p.climb.idClimbPos = v.climb.idClimbPos;
      p.climb.flClimbLevel = v.climb.flClimbLevel;
      if (p.climb.flClimbLevel) {
        p.climb.flClimbLevelSelf = v.climb.flClimbLevelSelf;
        p.climb.flClimbLevelOther = v.climb.flClimbLevelOther;
        p.climb.flClimbMove = v.climb.flClimbMove;
      }
      p.climb.flClimbOther = v.climb.flClimbOther;
      if (p.climb.flClimbOther) {
        p.climb.numClimbOther = v.climb.numClimbOther;
      }
    }

    p.controlPanel.flPanel = v.controlPanel.flPanel;
    if (p.controlPanel.flPanel) {
      p.controlPanel.flPanelBrake = v.controlPanel.flPanelBrake;
      p.controlPanel.flPanelRotation = v.controlPanel.flPanelRotation;
      p.controlPanel.flPanelPos = v.controlPanel.flPanelPos;
      p.controlPanel.flPanelSensor = v.controlPanel.flPanelSensor;
      p.controlPanel.txPanelSensor = v.controlPanel.txPanelSensor;
    }

    p.auto.flAuto = v.auto.flAuto;
    if (p.auto.flAuto) {
      p.auto.flAutoLine = v.auto.flAutoLine;
      p.auto.flAutoShoot = v.auto.flAutoShoot;
      if (p.auto.flAutoShoot) {
        p.auto.numAutoShoot = v.auto.numAutoShoot;
        p.auto.numAutoLoad = v.auto.numAutoLoad;
      }
    }

    if (v.record.created === '') {
      p.record.dtCreated = new Date().toString();
    } else {
      p.record.dtCreated = v.record.dtCreated;
    }
    p.record.dtModified = new Date().toString();
    p.record.txComputerName = v.record.txComputerName;

    this.logger.max('PitComponent, convertValuesToPitClasses, returning: ', p);
    return p;
  }

  private getTeamFromEventStorage(id: string): Team {
    let team: Team = new Team();
    this.selectedEventStorage.teams.forEach(t => {
      if (t.key === id) {
        team = t;
      }
    });
    return team;
  }

  private onChanges(): void {
    this.pitForm.get('imperialUnits').valueChanges.subscribe(val => {
      this.logger.max('PitComponent, onChanges, imperialUnits: ', val);
      this.imperialUnits = val;
    });

    this.pitForm.get('powerCells').get('flCells').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('powerCells').get('flIntakeGround').enable();
        this.pitForm.get('powerCells').get('flIntakeHigh').enable();
        this.pitForm.get('powerCells').get('numStorage').enable();
        this.pitForm.get('powerCells').get('txShooting').enable();
        this.pitForm.get('powerCells').get('flTargetLow').enable();
        this.pitForm.get('powerCells').get('flTargetOuter').enable();
        this.pitForm.get('powerCells').get('flTargetInner').enable();
      } else {
        this.pitForm.get('powerCells').get('flIntakeGround').disable();
        this.pitForm.get('powerCells').get('flIntakeHigh').disable();
        this.pitForm.get('powerCells').get('numStorage').disable();
        this.pitForm.get('powerCells').get('txShooting').disable();
        this.pitForm.get('powerCells').get('flTargetLow').disable();
        this.pitForm.get('powerCells').get('flTargetOuter').disable();
        this.pitForm.get('powerCells').get('flTargetInner').disable();
      }
    });

    this.pitForm.get('climb').get('flClimb').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('climb').get('idClimbType').enable();
        this.pitForm.get('climb').get('numClimbHeight').enable();
        this.pitForm.get('climb').get('flClimbSecure').enable();
        this.pitForm.get('climb').get('idClimbGrab').enable();
        this.pitForm.get('climb').get('idClimbSpeed').enable();
        this.pitForm.get('climb').get('flClimbTilt').enable();
        this.pitForm.get('climb').get('txClimb').enable();
        this.pitForm.get('climb').get('idClimbPos').enable();
        this.pitForm.get('climb').get('flClimbLevel').enable();
      } else {
        this.pitForm.get('climb').get('flClimbLevel').disable();
        this.pitForm.get('climb').get('idClimbType').disable();
        this.pitForm.get('climb').get('numClimbHeight').disable();
        this.pitForm.get('climb').get('flClimbSecure').disable();
        this.pitForm.get('climb').get('idClimbGrab').disable();
        this.pitForm.get('climb').get('idClimbSpeed').disable();
        this.pitForm.get('climb').get('flClimbTilt').disable();
        this.pitForm.get('climb').get('txClimb').disable();
        this.pitForm.get('climb').get('idClimbPos').disable();
      }
    });

    this.pitForm.get('climb').get('flClimbLevel').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('climb').get('flClimbLevelSelf').enable();
        this.pitForm.get('climb').get('flClimbLevelOther').enable();
        this.pitForm.get('climb').get('flClimbMove').enable();
        this.pitForm.get('climb').get('flClimbOther').enable();
      } else {
        this.pitForm.get('climb').get('flClimbLevelSelf').disable();
        this.pitForm.get('climb').get('flClimbLevelOther').disable();
        this.pitForm.get('climb').get('flClimbMove').disable();
        this.pitForm.get('climb').get('flClimbOther').disable();
      }
    });

    this.pitForm.get('climb').get('flClimbOther').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('climb').get('numClimbOther').enable();
      } else {
        this.pitForm.get('climb').get('numClimbOther').disable();

      }
    });

    this.pitForm.get('controlPanel').get('flPanel').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('controlPanel').get('flPanelBrake').enable();
        this.pitForm.get('controlPanel').get('flPanelRotation').enable();
        this.pitForm.get('controlPanel').get('flPanelPos').enable();
        this.pitForm.get('controlPanel').get('flPanelSensor').enable();
        this.pitForm.get('controlPanel').get('txPanelSensor').enable();
      } else {
        this.pitForm.get('controlPanel').get('flPanelBrake').disable();
        this.pitForm.get('controlPanel').get('flPanelRotation').disable();
        this.pitForm.get('controlPanel').get('flPanelPos').disable();
        this.pitForm.get('controlPanel').get('flPanelSensor').disable();
        this.pitForm.get('controlPanel').get('txPanelSensor').disable();
      }
    });

    this.pitForm.get('auto').get('flAuto').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('auto').get('flAutoLine').enable();
        this.pitForm.get('auto').get('flAutoShoot').enable();
      } else {
        this.pitForm.get('auto').get('flAutoLine').disable();
        this.pitForm.get('auto').get('flAutoShoot').disable();

      }
    });

    this.pitForm.get('auto').get('flAutoShoot').valueChanges.subscribe(val => {
      if (val) {
        this.pitForm.get('auto').get('numAutoShoot').enable();
        this.pitForm.get('auto').get('numAutoLoad').enable();
      } else {
        this.pitForm.get('auto').get('numAutoShoot').disable();
        this.pitForm.get('auto').get('numAutoLoad').disable();
      }
    });

    this.pitForm.get('details').get('idTeam').valueChanges.subscribe( val => {
      this.logger.max('PitComponent, onChanges, team changed to: ', val);
      this.selectedPitStorage = this.dataStorageService.getPitStorageForTeamKey(val);
      this.createForm(this.selectedPitStorage, val);
    })

  }

  public onSubmit(): void {
    this.logger.debug('PitComponent, onSubmit, values: ', this.pitForm.value);
    this.spinner = true;

    const pitStorage: PitStorage = new PitStorage();
    pitStorage.pit = this.convertValuesToPitClass(this.pitForm.value);
    pitStorage.event = this.selectedEventStorage.event;
    pitStorage.team = this.getTeamFromEventStorage(pitStorage.pit.details.idTeam);

    this.dataStorageService.addToPitStorage(pitStorage);

    this.spinner = false;
    this.successMessage = 'Pit details saved to storage';
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);


    // this.qrValue = `${JSON.stringify(this.pitForm.value)}`;
  }


  ngOnInit() {
    this.dataStorageService.selectedEventStorage$.subscribe(value => {
      this.selectedEventStorage = value;
      this.createForm();
    })
  }

}
