import { Component, OnInit } from '@angular/core';
import {Team, TeamMember} from '../objects/pit-classes';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FrcEvent} from '../objects/frcEvent-object';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.component.html',
  styleUrls: ['./scout.component.scss'],
})
export class ScoutComponent implements OnInit {

  public driverPosition: string;
  public events: FrcEvent[] = [];
  public scoutForm: FormGroup;
  public teamMembers: TeamMember[] = [];
  public teams: Team[] = [];

  constructor(
      private dataInputService: DataInputService,
      private fb: FormBuilder,
      private logger: LoggerService
  ) {
    this.teamMembers = this.dataInputService.getTeamMembers();
    this.teams = this.dataInputService.getTeamData();
    this.events = this.dataInputService.getEvents();
    this.createScoutForm();
  }

  public createScoutForm(): void {
    this.scoutForm = this.fb.group({
      match: this.fb.group({
        teamMemberId: ['', Validators.required],
        event: ['', Validators.required]
      }),
      details: this.fb.group({
        match: '',
        alliance: '',
        driveStation: '',
        team: '',
        robotPosition: ''
      }),
      penalties: this.fb.group({
        failure: false,
        yellowCard: false,
        redCard: false
      }),
      driverPosition: this.fb.group({
        topLeft: '',
        middleLeft: '',
        bottomLeft: '',
        topRight: '',
        middleRight: '',
        bottomRight: ''
      }),
      start: this.fb.group({
        exitsInitiationLine: false,
        doesAuto: false
      }),
      errors: this.fb.group({
        robotContact: false,
        foul: false
      }),
      powerPorts: this.fb.group({
        outer: '',
        inner: '',
        bottom: ''
        }),
      groundIntake: this.fb.group({
        redTrench: '',
        redRendezvous: '',
        blueTrench: '',
        blueRendezvous: '',
        otherLocation: ''
      })
    });

    this.logger.debug('ScoutComponent, createScoutForm, returning: ', this.scoutForm);

  }

  public setDriverPosition(position: string): void {
    this.driverPosition = position;
    const driverPositionForm = this.scoutForm.controls.driverPosition;
    const positions: any[] = this.scoutForm.controls.driverPosition.value;
    Object.keys(positions).forEach(k => {
      if (k === position) {
        driverPositionForm.patchValue({[k]: true});
      } else {
        driverPositionForm.patchValue({[k]: false});
      }
    });

    this.logger.max('ScoutComponent, setDriverPosition, driverPositionForm: ', driverPositionForm);

  }


  ngOnInit() {}

}
