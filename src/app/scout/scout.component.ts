import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventStorage} from '../objects/frcEvent-object';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {Router} from '@angular/router';
import {ScoutParentData} from '../objects/scout-parentData';
import {FormService} from '../services/formService/form.service';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.component.html',
  styleUrls: ['./scout.component.scss'],
})
export class ScoutComponent implements OnInit {

  public driveStationColor = '';
  public parentDataForm: FormGroup;
  public selectedEventStorage: EventStorage;
  public selectedForm = 'auto';


  constructor(
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private formService: FormService,
      private logger: LoggerService,
      public router: Router
  ) {
  }

  public createParentDataForm(): void {
    this.parentDataForm = this.fb.group({
      frcEvent: [this.selectedEventStorage.event.event_code, Validators.required],
      teamDetails: this.fb.group({
        numMatch: ['', Validators.required],
        idAlliance: ['', Validators.required],
        idDriveStation: [{value: '', disabled: true}, Validators.required],
        idTeam: ['', Validators.required],
        txScoutName: ''
      }),
      matchSetup: this.fb.group({
        idStartFacing: '',
        idStartPosition: '',
        numStartCells: 0,
      }),
      results: this.fb.group({
        flRed: false,
        flYellow: false,
        flCrash: false,
        flRanking1: false,
        flRanking2: false
      })

    });
    this.onFormChange();
    this.logger.debug('ScoutComponent, createScoutForm, returning: ', this.parentDataForm);
  }

  private getSelectedEventStorage(): void {
    this.selectedEventStorage = this.dataStorageService.getSelectedEventStorage();
    this.logger.max('ScoutComponent, getSelectedEventStorage: ', this.selectedEventStorage);
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
    const v: any = this.parentDataForm.value;
    p.txEvent = v.frcEvent;
    p.teamDetails.numMatch = v.teamDetails.numMatch;
    p.teamDetails.idAlliance = v.teamDetails.idAlliance;
    p.teamDetails.idDriveStation = v.teamDetails.idDriveStation;
    p.teamDetails.txScoutName = v.teamDetails.txScoutName;

    p.matchSetup.idStartFacing = v.matchSetup.idStartFacing;
    p.matchSetup.idStartPosition = v.matchSetup.idStartPosition;
    p.matchSetup.numStartCells = v.matchSetup.numStartCells;

    p.results.flRed = v['results'].flRed;
    p.results.flYellow = v['results'].flYellow;
    p.results.flCrash = v['results'].flCrash;
    p.results.flRanking1 = v['results'].flRanking1;
    p.results.flRanking2 = v['results'].flRanking2;

    this.formService.pushParentData(p);

  }


  ngOnInit() {
    this.getSelectedEventStorage();
    this.createParentDataForm();
    const route = this.router.url;
    const routes = route.split('/');
    this.selectForm(routes[routes.length - 1]);
  }

}
