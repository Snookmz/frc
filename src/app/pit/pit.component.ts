import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../services/loggerService/logger.service';
import {Pit, PitStorage, TeamMember} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {EventStorage, FrcEvent} from '../objects/frcEvent-object';
import {Team} from '../objects/team-object';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Platform} from '@ionic/angular';
import * as moment from 'moment';

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
  public device = 'web';

  constructor(
      private camera: Camera,
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService,
      private platform: Platform
  ) {

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.logger.debug('EnvironmentService, We are on a mobile device');
        this.device = 'mobile';
      } else {
        this.logger.debug('EnvironmentService, We are in a web browser');
        this.device = 'web';
      }
    });
  }

  public createTeamNameString(key: string, nickname: string): string {
    key = key.replace('frc', '');
    return `${key} - ${nickname}`;
  }

  private createForm(ps?: PitStorage, teamNumber?: number): void {
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
      event: this.selectedEventStorage.event.key,
      details: this.fb.group({
        idTeam: [teamNumber, Validators.required],
        // name: ['', Validators.required],
        txDeviceName: [this.selectedEventStorage.deviceName, Validators.required],
        txScoutName: [ps.pit.details.txScoutName],
        imperialUnits: [ps.pit.imperialUnits, Validators.required],
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
        dtCreated: ps.pit.record.dtCreated,
        dtModified: '',
        txComputerName: this.selectedEventStorage.deviceName
      }),
      txPitNotes: ps.pit.txPitNotes
    });

    this.logger.max('PitComponent, createForm, returning: ', this.pitForm);
    this.onChanges();
  }


  public convertValuesToPitClass(v: any): Pit {
    const p: Pit = new Pit();
    this.logger.max('PitComponent, convertValuesToPitClass: ', v);
    p.imperialUnits = v.details.imperialUnits;

    p.event = v.event;
    p.txPitNotes = v.txPitNotes;
    p.details.idTeam = parseInt(v.details.idTeam, 10);
    // p.details.team = this.getTeamFromTeamId(v.details.teamId);
    p.details.name = v.details.name;
    p.details.txScoutName = v.details.txScoutName;

    p.robotStats.numWeight = parseInt(v.robotStats.numWeight, 10);
    p.robotStats.numHeight = parseInt(v.robotStats.numHeight, 10);
    p.robotStats.imgTeamUniform = v.robotStats.imgTeamUniform;
    p.robotStats.imgRobotFront = v.robotStats.imgRobotFront;
    p.robotStats.imgRobotSide = v.robotStats.imgRobotSide;

    p.powerCells.flCells = v.powerCells.flCells;
    if (p.powerCells.flCells) {
      p.powerCells.flIntakeGround = v.powerCells.flIntakeGround;
      p.powerCells.flIntakeHigh = v.powerCells.flIntakeHigh;
      p.powerCells.numStorage = parseInt(v.powerCells.numStorage, 10);
      p.powerCells.txShooting = v.powerCells.txShooting;
      p.powerCells.flTargetLow = v.powerCells.flTargetLow;
      p.powerCells.flTargetOuter = v.powerCells.flTargetOuter;
      p.powerCells.flTargetInner = v.powerCells.flTargetInner;
    }

    p.climb.flClimb = v.climb.flClimb;
    if (p.climb.flClimb) {
      p.climb.idClimbType = parseInt(v.climb.idClimbType, 10);
      p.climb.numClimbHeight = parseInt(v.climb.numClimbHeight, 10);
      p.climb.flClimbSecure = v.climb.flClimbSecure;
      p.climb.idClimbGrab = parseInt(v.climb.idClimbGrab, 10);
      p.climb.idClimbSpeed = parseInt(v.climb.idClimbSpeed, 10);
      p.climb.flClimbTilt = v.climb.flClimbTilt;
      p.climb.txClimb = v.climb.txClimb;
      p.climb.idClimbPos = parseInt(v.climb.idClimbPos, 10);
      p.climb.flClimbLevel = v.climb.flClimbLevel;
      if (p.climb.flClimbLevel) {
        p.climb.flClimbLevelSelf = v.climb.flClimbLevelSelf;
        p.climb.flClimbLevelOther = v.climb.flClimbLevelOther;
        p.climb.flClimbMove = v.climb.flClimbMove;
      }
      p.climb.flClimbOther = v.climb.flClimbOther;
      if (p.climb.flClimbOther) {
        p.climb.numClimbOther = parseInt(v.climb.numClimbOther, 10);
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
        p.auto.numAutoShoot = parseInt(v.auto.numAutoShoot, 10);
        p.auto.numAutoLoad = parseInt(v.auto.numAutoLoad, 10);
      }
    }

    if (v.record.dtCreated === '') {
      p.record.dtCreated = moment().format('YYYYMMDD_HHMMSS').toString();
    } else {
      p.record.dtCreated = v.record.dtCreated;
    }
    p.record.dtModified = moment().format('YYYYMMDD_HHMMSS').toString();
    p.record.txComputerName = v.record.txComputerName;

    if (!p.imperialUnits) {
      p.robotStats.numWeight = Math.round(p.robotStats.numWeight * 2.20462);
      p.robotStats.numHeight = Math.round(p.robotStats.numHeight / 2.54);
      p.climb.numClimbHeight = Math.round(p.climb.numClimbHeight / 2.54);
    }

    this.logger.max('PitComponent, convertValuesToPitClasses, returning: ', p);
    return p;
  }

  private getTeamFromEventStorage(id: number): Team {
    let team: Team = new Team();
    this.selectedEventStorage.teams.forEach(t => {
      if (t.team_number === id) {
        team = t;
      }
    });
    return team;
  }


  public decreaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.pitForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal--;
    if (currentVal < 1) {
      currentVal = 0;
    }
    this.pitForm.patchValue({[group]: {[el]: currentVal}});
  }


  public increaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.pitForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal++;
    this.pitForm.patchValue({[group]: {[el]: currentVal}});
  }

  private onChanges(): void {
    this.pitForm.get('details').get('imperialUnits').valueChanges.subscribe(val => {
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
        this.pitForm.get('climb').get('numClimbOther').enable();
      } else {
        this.pitForm.get('climb').get('flClimbLevelSelf').disable();
        this.pitForm.get('climb').get('flClimbLevelOther').disable();
        this.pitForm.get('climb').get('flClimbMove').disable();
        this.pitForm.get('climb').get('flClimbOther').disable();
        this.pitForm.get('climb').get('numClimbOther').disable();
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

  public takePicture(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.logger.max('PitComponent, takePicture, image: ', base64Image);
    }, (err) => {
      // Handle error
      this.logger.error('PitComponent, takePicture, error: ', err);
    });
  }

  ngOnInit() {
    this.dataStorageService.selectedEventStorage$.subscribe(value => {
      this.selectedEventStorage = value;
      this.createForm();
    })
  }

}
