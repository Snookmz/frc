import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {ScoutTele} from '../../objects/scoutTele';
import {FormService} from '../../services/formService/form.service';

@Component({
  selector: 'app-tele',
  templateUrl: './tele.component.html',
  styleUrls: ['./tele.component.scss'],
})
export class TeleComponent implements OnInit {
  public teleForm: FormGroup;
  public deviceWidth = '';


  constructor(
      private fb: FormBuilder,
      private logger: LoggerService,
      private platform: Platform,
      public router: Router,
      public formService: FormService
  ) { }

  public createTeleForm(t: ScoutTele): void {
    this.teleForm = this.fb.group({
      controlPanel: this.fb.group({
        tele_flPanelRotation: t.controlPanel.tele_flPanelRotation,
        tele_idPanelRotationTime: [{value: t.controlPanel.tele_idPanelRotationTime, disabled: !t.controlPanel.tele_flPanelRotation}],
        tele_flPanelPosition: t.controlPanel.tele_flPanelPosition,
        tele_idPanelPositionTime: [{value: t.controlPanel.tele_idPanelPositionTime, disabled: !t.controlPanel.tele_flPanelPosition}],
        tele_numPanelAttempt: t.controlPanel.tele_numPanelAttempt,
        tele_numPanelSuccess: t.controlPanel.tele_numPanelSuccess
      }),
      endGame: this.fb.group({
        tele_flPark: t.endGame.tele_flPark,
        tele_idClimb: [t.endGame.tele_idClimb, Validators.required],
        tele_idClimbGrabTime: t.endGame.tele_idClimbGrabTime,
        tele_idClimbTime: t.endGame.tele_idClimbTime,
        tele_idClimbOutcome: t.endGame.tele_idClimbOutcome,
        tele_idClimbPos: t.endGame.tele_idClimbPos,
        tele_numClimbOthers: t.endGame.tele_numClimbOthers,
        tele_flClimbBalance: t.endGame.tele_flClimbBalance,
        tele_flClimbCorrection: t.endGame.tele_flClimbCorrection,
        tele_flClimbFall: t.endGame.tele_flClimbFall
      }),
      performance: this.fb.group({
        tele_numCellAttempt: t.performance.tele_numCellAttempt,
        tele_numCellSuccess: t.performance.tele_numCellSuccess,
        tele_flOuter: t.performance.tele_flOuter,
        tele_flInner: t.performance.tele_flInner,
        tele_flLower: t.performance.tele_flLower
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

  public onSubmit(): void {
    this.logger.max('TeleComponent, onSubmit, values: ', this.teleForm.value);

    const v = this.teleForm.value;
    const t: ScoutTele = new ScoutTele();
    t.controlPanel.tele_flPanelRotation = v.controlPanel.tele_flPanelRotation;
    t.controlPanel.tele_idPanelRotationTime = v.controlPanel.tele_idPanelRotationTime;
    t.controlPanel.tele_flPanelPosition = v.controlPanel.tele_flPanelPosition;
    t.controlPanel.tele_idPanelPositionTime = v.controlPanel.tele_idPanelPositionTime;
    t.controlPanel.tele_numPanelAttempt = v.controlPanel.tele_numPanelAttempt;
    t.controlPanel.tele_numPanelSuccess = v.controlPanel.tele_numPanelSuccess;

    t.endGame.tele_flPark = v.endGame.tele_flPark;
    t.endGame.tele_idClimb = v.endGame.tele_idClimb;
    t.endGame.tele_idClimbGrabTime = v.endGame.tele_idClimbGrabTime;
    t.endGame.tele_idClimbTime = v.endGame.tele_idClimbTime;
    t.endGame.tele_idClimbOutcome = v.endGame.tele_idClimbOutcome;
    t.endGame.tele_numClimbOthers = v.endGame.tele_numClimbOthers;
    t.endGame.tele_flClimbBalance = v.endGame.tele_flClimbBalance;
    t.endGame.tele_flClimbCorrection = v.endGame.tele_flClimbFall;

    t.performance.tele_numCellAttempt = v.performance.tele_numCellAttempt;
    t.performance.tele_numCellSuccess = v.performance.tele_numCellSuccess;
    t.performance.tele_flOuter = v.performance.tele_flOuter;
    t.performance.tele_flInner = v.performance.tele_flInner;
    t.performance.tele_flLower = v.performance.tele_flLower;

    this.formService.pushTeleData(t);

  }




  public setTelePosition(position: string): void {
    this.teleForm.patchValue({performance: {[position]: !this.teleForm.value['performance'][position]}})
  }

  ngOnInit() {

    this.formService.scout$.subscribe(s => {
      this.logger.max('TeleComponent, scout$: ', s);
      this.createTeleForm(s.tele);
    });

    this.deviceWidth = this.platform.width();
    this.platform.resize.subscribe( async () => {
      this.logger.max('AppComponent, resize: ', this.platform.width());
      this.deviceWidth = this.platform.width();
    });
    // this.onWindowResize();
  }

}
