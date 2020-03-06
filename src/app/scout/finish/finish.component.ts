import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../../services/loggerService/logger.service';
import {FormService} from '../../services/formService/form.service';
import {Scout} from '../../objects/scout-parentData';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventStorage} from '../../objects/frcEvent-object';
import {DataStorageService} from '../../services/dataStorageService/data-storage.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {

  public scout: Scout;

  public formComplete = true;
  public finishForm: FormGroup;
  public frcEvent: string;
  public idAlliance: number;
  public idDriveStation: number;
  public idTeam: number;
  public numMatch: number;
  public tele_idClimb: number;
  public driveStationColor = '';
  public selectedEventStorage: EventStorage;
  public saveMatchSpinner = false;

  constructor(
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private formService: FormService,
      private logger: LoggerService,
  ) { }

  public compareWith = ((o1, o2) => {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  });

  private checkFormComplete(s: Scout): boolean {
    let complete = true;

    this.frcEvent = s.parentData.txEvent;
    this.idAlliance = s.parentData.teamDetails.idAlliance;
    this.idDriveStation = s.parentData.teamDetails.idDriveStation;
    this.idTeam = s.parentData.teamDetails.idTeam;
    this.tele_idClimb = s.tele.endGame.tele_idClimb;
    this.numMatch = s.parentData.teamDetails.numMatch;

    if (this.frcEvent === '' ||
        this.idAlliance === 0 ||
        this.idDriveStation === 0 ||
        this.idTeam === 0 ||
        this.tele_idClimb === 0 ||
        this.numMatch === 0
    ) {
      complete = false;
    }

    this.logger.max('FinishComponent, checkFormComplete: ', complete);
    return complete;
  }

  private createFinishForm(s: Scout): void {
    this.finishForm = this.fb.group({
      idAlliance: [s.parentData.teamDetails.idAlliance, Validators.required],
      idDriveStation: [s.parentData.teamDetails.idDriveStation, Validators.required],
      idTeam: [s.parentData.teamDetails.idTeam, Validators.required],
      tele_idClimb: [s.tele.endGame.tele_idClimb, Validators.required],
      numMatch: [s.parentData.teamDetails.numMatch, Validators.required]
    });
    this.onFormChange();
  }


  private onFormChange(): void {
    this.finishForm.get('idAlliance').valueChanges.subscribe(val => {
      this.logger.max('FinishComponent, onFormChanges, idAlliance: ', val);
      this.finishForm.get('idDriveStation').enable();
      if (val === '1') {
        this.driveStationColor = 'Red';
      } else {
        this.driveStationColor = 'Blue';
      }
      this.logger.max('FinishComponent, onFormChange, drive station color: ', this.driveStationColor);
    })
  }

  public onSubmit(): void {
    this.logger.debug('FinishComponent, onSubmit, values: ', this.finishForm.value);
    const v: any = this.finishForm.value;
    const s: Scout = this.formService.getScout();
    s.parentData.teamDetails.idAlliance = v.idAlliance;
    s.parentData.teamDetails.idDriveStation = v.idDriveStation;
    s.parentData.teamDetails.idTeam = parseInt(v.idTeam, 10);
    s.tele.endGame.tele_idClimb = v.tele_idClimb;
    s.parentData.teamDetails.numMatch = v.numMatch;

    this.formService.pushScout(s);
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
    this.formService.scout$.subscribe(s => {
      this.logger.max('FinishComponent, ngOnInit, scout$: ', s);
      this.scout = s;
      this.formComplete = this.checkFormComplete(s);
      if (!this.formComplete) {
        this.selectedEventStorage = this.dataStorageService.getSelectedEventStorage();
        this.createFinishForm(s);
      }
    });

  }

}
