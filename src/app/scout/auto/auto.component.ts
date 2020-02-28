import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';
import {ScoutParentData} from '../../objects/scout-parentData';
import {FormService} from '../../services/formService/form.service';
import {Router} from '@angular/router';
import {ScoutAuto} from '../../objects/scout-auto';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss'],
})
export class AutoComponent implements OnInit {

  public autoForm: FormGroup;
  public parentData: ScoutParentData = new ScoutParentData();

  constructor(
      private cd: ChangeDetectorRef,
      private fb: FormBuilder,
      private formService: FormService,
      private logger: LoggerService,
      public router: Router
  ) { }

  private createAutoForm(a?: ScoutAuto): void {
    if (a === undefined) {
      a = new ScoutAuto();
    }

    this.autoForm = this.fb.group({
      position: this.fb.group({
        red1: false,
        red2: false,
        red3: false,
        blue1: false,
        blue2: false,
        blue3: false
      }),
      auto: this.fb.group({
        auto_flStart: [a.auto.auto_flStart, Validators.required],
        auto_flBaseLine: [{value: a.auto.auto_flBaseLine, disabled: !a.auto.auto_flStart}],
        auto_numCellLoad: [{value: a.auto.auto_numCellLoad, disabled: !a.auto.auto_flStart}]
      }),
      errors: this.fb.group({
        auto_flFoul: a.errors.auto_flFoul,
        auto_flRobotContact: a.errors.auto_flRobotContact,
        auto_flLoseStartObject: a.errors.auto_flLoseStartObject,
        auto_flCrossOver: a.errors.auto_flCrossover
      }),
      performance: this.fb.group({
        auto_numCellAttempt: a.performance.auto_numCellAttempt,
        auto_numCellSuccess: a.performance.auto_numCellSuccess,
        auto_flOuter: a.performance.auto_flOuter,
        auto_flInner: a.performance.auto_flInner,
        auto_flLower: a.performance.auto_flLower
      })
    });

    if (this.parentData.teamDetails.idAlliance === 1) {
      this.autoForm.patchValue({position: {['red' + this.parentData.teamDetails.idDriveStation]: true}})
    } else {
      this.autoForm.patchValue({position: {['blue' + this.parentData.teamDetails.idDriveStation]: true}})
    }

    this.logger.max('AutoComponent, createAutoForm: ', this.autoForm);
    this.onFormChanges();

  }


  public decreaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.autoForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal--;
    if (currentVal < 1) {
      currentVal = 0;
    }
    if (el === 'auto_numCellSuccess') {
      this.decreaseValue(group, 'auto_numCellAttempt');
    }
    this.autoForm.patchValue({[group]: {[el]: currentVal}});
  }


  public increaseValue(group: string, el: string): void {
    let currentVal: number = parseInt(this.autoForm.value[group][el], 10);
    if (currentVal === 0) {
      currentVal = 0;
    }
    currentVal++;
    if (el === 'auto_numCellSuccess') {
      this.increaseValue(group, 'auto_numCellAttempt');
    }
    this.autoForm.patchValue({[group]: {[el]: currentVal}});
  }

  private onFormChanges(): void {
    this.autoForm.get('auto').get('auto_flStart').valueChanges.subscribe(val => {
      if (val) {
        this.autoForm.get('auto').get('auto_flBaseLine').enable();
        this.autoForm.get('auto').get('auto_numCellLoad').enable();
      } else {
        this.autoForm.get('auto').get('auto_flBaseLine').disable();
        this.autoForm.get('auto').get('auto_numCellLoad').disable();
      }
    })
  }

  public onSubmit(): void {
    this.logger.debug('AutoComponent, onSubmit, values: ', this.autoForm.value);
    const v = this.autoForm.value;
    const a: ScoutAuto = new ScoutAuto();
    a.auto.auto_flStart = v.auto.auto_flStart;
    a.auto.auto_flBaseLine = v.auto.auto_flBaseLine;
    a.auto.auto_numCellLoad = v.auto.auto_numCellLoad;

    a.errors.auto_flFoul = v.errors.auto_flFoul;
    a.errors.auto_flRobotContact = v.errors.auto_flRobotContact;
    a.errors.auto_flLoseStartObject = v.errors.auto_flLoseStartObject;
    a.errors.auto_flCrossover = v.errors.auto_flCrossOver;

    a.performance.auto_numCellAttempt = v.performance.auto_numCellAttempt;
    a.performance.auto_numCellSuccess = v.performance.auto_numCellSuccess;
    a.performance.auto_flOuter = v.performance.auto_flOuter;
    a.performance.auto_flInner = v.performance.auto_flInner;
    a.performance.auto_flLower = v.performance.auto_flLower;

    this.formService.pushAutoData(a);


  }

  ngOnInit() {
    this.formService.scout$.subscribe(s => {
      this.logger.max('AutoComponent, scout$: ', s);
      this.parentData = s.parentData;
      this.createAutoForm(s.auto);
    })

  }

}
