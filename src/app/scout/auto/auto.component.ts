import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss'],
})
export class AutoComponent implements OnInit {

  public autoForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private logger: LoggerService
  ) { }

  private createAutoForm(): void {
    this.autoForm = this.fb.group({
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
        auto_numCellAttempt: '',
        auto_numCellSuccess: '',
        auto_flOuter: false,
        auto_flInner: false,
        auto_flLower: false
      })
    });
    this.logger.max('AutoComponent, createAutoForm: ', this.autoForm);
    this.onFormChanges();

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
  }

}
