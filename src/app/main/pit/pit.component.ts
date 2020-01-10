import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoggerService} from '../../services/loggerService/logger.service';

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss'],
})
export class PitComponent implements OnInit {

  public pitForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private logger: LoggerService
  ) { }

  private createForm(): void {
    this.logger.max('PitComponent, createForm');

    this.pitForm = this.fb.group({
      detail: this.fb.group({
        team: '',
        scout: '',
        computerName: '',
        dtCreation: ''
      }),
      hatches: this.fb.group({
        canManipulate: false,
        floorIntake: false,
        deliverLowLevel: false,
        deliverMidLevel: false,
        deliverHighLevel: false,
        notes: ''
      }),
      cargo: this.fb.group({
        canManipulate: false,
        floorIntake: false,
        exchangeIntake: false,
        deliverLowLevel: false,
        deliverMidLevel: false,
        deliverHighLevel: false,
        notes: ''
      }),
      sandstorm: this.fb.group({
        control: '',
        maxHAB: '',
        deliverHatch: this.fb.group({
          maxHatches: '',
          maxHeight: ''
        }),
        deliverCargo: this.fb.group({
          maxCargo: '',
          maxHeight: ''
        }),
        climb: this.fb.group({
          canClimb: false,
          type: '',
          grabSpeed: '',
          climbSpeed: '',
          maxHeight: ''
        }),
        image: this.fb.group({
          front: '',
          side: ''
        }),
        notes: ''
      })
    });

  }

  ngOnInit() {}

}
