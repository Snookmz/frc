import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventStorage} from '../objects/frcEvent-object';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {Router} from '@angular/router';
import {ScoutParentData} from '../objects/scout-parentData';
import {FormService} from '../services/formService/form.service';
import {Platform} from '@ionic/angular';
import {ValidatorService} from '../services/validatorService/validator.service';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.component.html',
  styleUrls: ['./scout.component.scss'],
})
export class ScoutComponent implements OnInit {

  public driveStationColor = '';
  public displayWidth = 0;
  public parentDataForm: FormGroup;
  public selectedEventStorage: EventStorage;
  public selectedForm = 'auto';
  public saveMatchSpinner = false;
  public saveParentDataSpinner = false;
  public showHelp = true;


  constructor(
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private formService: FormService,
      private logger: LoggerService,
      private platform: Platform,
      public router: Router,
      private validator: ValidatorService
  ) {
  }

  public createParentDataForm(p?: ScoutParentData, eventCode?: string): void {
    if (p === undefined) {
      p = new ScoutParentData();
    }
    if (eventCode === undefined) {
      eventCode = '';
    }

    this.parentDataForm = this.fb.group({
      frcEvent: [eventCode, Validators.required],
      teamDetails: this.fb.group({
        numMatch: [p.teamDetails.numMatch, [Validators.required, this.validator.notEmpty]],
        idAlliance: [p.teamDetails.idAlliance, [Validators.required, this.validator.notEmpty]],
        idDriveStation: [{value: p.teamDetails.idDriveStation, disabled: true}, Validators.required],
        idTeam: [p.teamDetails.idTeam, [Validators.required, this.validator.notEmpty]],
        txScoutName: p.teamDetails.txScoutName
      }),
      matchSetup: this.fb.group({
        idStartFacing: p.matchSetup.idStartFacing,
        idStartPosition: p.matchSetup.idStartPosition,
        numStartCells: p.matchSetup.numStartCells,
      }),
      results: this.fb.group({
        flRed: p.results.flRed,
        flYellow: p.results.flYellow,
        flCrash: p.results.flCrash,
        flRanking1: p.results.flRanking1,
        flRanking2: p.results.flRanking2
      })

    });
    this.onFormChange();
    this.logger.debug('ScoutComponent, createScoutForm, returning: ', this.parentDataForm);
  }

  public decreaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.parentDataForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal--;
    if (currentVal < 1) {
      currentVal = 0;
    }
    this.parentDataForm.patchValue({[group]: {[el]: currentVal}});
  }

  public increaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.parentDataForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal++;
    this.parentDataForm.patchValue({[group]: {[el]: currentVal}});
  }

  public selectForm(form: string):void {
    this.selectedForm = form;
    this.router.navigateByUrl(`/scout/${form}`).catch(reason => {
      this.logger.error('ScoutComponent, error navigating to ' + form, reason);
    });
  }

  private onFormChange(): void {
    this.parentDataForm.get('teamDetails').get('idAlliance').valueChanges.subscribe(val => {
      this.logger.max('ScoutComponent, onFormChanges, idAlliance: ', val);
      this.parentDataForm.get('teamDetails').get('idDriveStation').enable();
      if (val === '1') {
        this.driveStationColor = 'Red';
      } else {
        this.driveStationColor = 'Blue';
      }
      this.logger.max('ScoutComponent, onFormChange, drive station color: ', this.driveStationColor);
    })
  }

  public onSubmit(): void {
    this.logger.max('ScoutComponent, onSubmit, values: ', this.parentDataForm.value);

    const p: ScoutParentData = new ScoutParentData();
    const v = this.parentDataForm.value;
    this.saveParentDataSpinner = true;

    p.txEvent = v.frcEvent;
    p.deviceName = this.selectedEventStorage.deviceName;

    p.teamDetails.numMatch = parseInt(v.teamDetails.numMatch, 10);
    p.teamDetails.idAlliance = parseInt(v.teamDetails.idAlliance, 10);
    p.teamDetails.idDriveStation = parseInt(v.teamDetails.idDriveStation, 10);
    p.teamDetails.idTeam = parseInt(v.teamDetails.idTeam, 10);
    p.teamDetails.txScoutName = v.teamDetails.txScoutName;

    p.matchSetup.idStartPosition = parseInt(v.matchSetup.idStartFacing, 10);
    p.matchSetup.idStartPosition = parseInt(v.matchSetup.idStartPosition, 10);
    p.matchSetup.numStartCells = parseInt(v.matchSetup.numStartCells, 10);

    p.results.flRed = v['results'].flRed;
    p.results.flYellow = v['results'].flYellow;
    p.results.flCrash = v['results'].flCrash;
    p.results.flRanking1 = v['results'].flRanking1;
    p.results.flRanking2 = v['results'].flRanking2;

    setTimeout(() => {
      this.saveParentDataSpinner = false;
    }, 1000);

    this.formService.pushParentData(p);

  }

  public saveMatch(): void {
    this.logger.max('ScoutComponent, saveMatch: ', this.formService.getScout());
    this.saveMatchSpinner = true;
    this.dataStorageService.storeScoutMatch(this.formService.getScout());
    setTimeout(() => {
      this.saveMatchSpinner = false;
    }, 1000);

  }

  ngOnInit() {

    this.displayWidth = this.platform.width();
    this.platform.resize.subscribe(async () => {
      this.displayWidth = this.platform.width();
    });

    this.formService.scout$.subscribe(s => {
      this.selectedEventStorage = this.dataStorageService.getSelectedEventStorage();
      this.createParentDataForm(s.parentData, this.selectedEventStorage.event.event_code)
    });

    const route = this.router.url;
    const routes = route.split('/');
    this.selectForm(routes[routes.length - 1]);
  }

}
