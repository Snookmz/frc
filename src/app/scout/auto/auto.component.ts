import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';
import {ScoutParentData} from '../../objects/scout-parentData';
import {FormService} from '../../services/formService/form.service';
import {Router} from '@angular/router';

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
      private router: Router
  ) { }

  private createAutoForm(): void {
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
        auto_flStart: [false, Validators.required],
        auto_flBaseLine: [{value: false, disabled: true}],
        auto_numCellLoad: [{value: false, disabled: true}]
      }),
      errors: this.fb.group({
        auto_flFoul: false,
        auto_flRobotContact: false,
        auto_flLoseStartObject: false,
        auto_flCrossOver: false
      }),
      performance: this.fb.group({
        auto_numCellAttempt: 0,
        auto_numCellSuccess: 0,
        auto_flOuter: false,
        auto_flInner: false,
        auto_flLower: false
      })
    });
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

  ngOnInit() {
    this.createAutoForm();
    this.formService.parentData$.subscribe(p => {
      this.logger.max('AutoComponent, parentData$: ', p);
      this.parentData = p;
      if (p.teamDetails.idAlliance === 1) {
        this.autoForm.patchValue({position: {['red' + p.teamDetails.idDriveStation]: true}})
      } else {
        this.autoForm.patchValue({position: {['blue' + p.teamDetails.idDriveStation]: true}})
      }
    })

  }

}
