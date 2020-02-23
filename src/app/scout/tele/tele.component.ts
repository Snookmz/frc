import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tele',
  templateUrl: './tele.component.html',
  styleUrls: ['./tele.component.scss'],
})
export class TeleComponent implements OnInit {

  public teleForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private logger: LoggerService,
      public router: Router,
  ) { }

  public createTeleForm(): void {
    this.teleForm = this.fb.group({
      controlPanel: this.fb.group({
        tele_flPanelRotation: false,
        tele_idPanelRotationTime: [{value: '', disabled: true}],
        tele_flPanelPosition: false,
        tele_idPanelPositionTime: [{value: '', disabled: true}],
        tele_numPanelPositionTime: '',
        tele_numPanelAttempt: 0,
        tele_numPanelSuccess: 0
      }),
      endGame: this.fb.group({
        tele_flPark: '',
        tele_idClimb: ['', Validators.required],
        tele_idClimbGrabTime: '',
        tele_idClimbTime: '',
        tele_idClimbOutcome: '',
        tele_idClimbPos: '',
        tele_numClimbOthers: 0,
        tele_flClimbBalance: false,
        tele_flClimbCorrection: false,
        tele_flClimbFall: false
      }),
      performance: this.fb.group({
        tele_numCellAttempt: 0,
        tele_numCellSuccess: 0,
        tele_flOuter: false,
        tele_flInner: false,
        tele_flLower: false
      })
    });
    this.onFormChange();
    this.logger.debug('TeleComponent, createTeleForm: ', this.teleForm);
  }

  public decreaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.teleForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal--;
    if (currentVal < 1) {
      currentVal = 0;
    }
    if (el === 'tele_numCellSuccess') {
      this.decreaseValue(group, 'tele_numCellAttempt');
    } else if (el === 'tele_numPanelSuccess') {
      this.decreaseValue(group, 'tele_numPanelAttempt');
    }
    this.teleForm.patchValue({[group]: {[el]: currentVal}});
  }


  public increaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.teleForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal++;
    if (el === 'tele_numCellSuccess') {
      this.increaseValue(group, 'tele_numCellAttempt');
    } else if (el === 'tele_numPanelSuccess') {
      this.increaseValue(group, 'tele_numPanelAttempt');
    }
    this.teleForm.patchValue({[group]: {[el]: currentVal}});
  }

  private onFormChange(): void {
    this.teleForm.get('controlPanel').get('tele_flPanelRotation').valueChanges.subscribe(val => {
      if (val) {
        this.teleForm.get('controlPanel').get('tele_idPanelRotationTime').enable();
      } else {
        this.teleForm.get('controlPanel').get('tele_idPanelRotationTime').disable();
      }
    });

    this.teleForm.get('controlPanel').get('tele_flPanelPosition').valueChanges.subscribe(val => {
      if (val) {
        this.teleForm.get('controlPanel').get('tele_idPanelPositionTime').enable();
      } else {
        this.teleForm.get('controlPanel').get('tele_idPanelPositionTime').disable();
      }
    });
  }


  public setTelePosition(position: string): void {
    this.teleForm.patchValue({performance: {[position]: !this.teleForm.value['performance'][position]}})
  }

  ngOnInit() {
    this.createTeleForm();
  }

}
