import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../services/loggerService/logger.service';
import {ClimbType, Pit, Team, TeamMember} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';

@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss'],
})
export class PitComponent implements OnInit {

  public pitForm: FormGroup;
  public teams: Team[] = [];
  public teamMembers: TeamMember[] = [];
  public climbTypes: ClimbType[] = [];
  public spinner = false;
  public successMessage = '';

  constructor(
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService
  ) {
    this.createForm();

    this.teams = this.dataInputService.getTeamData();
    this.teamMembers = this.dataInputService.getTeamMembers();
    this.climbTypes = this.dataInputService.getClimbTypes();
  }

  private createForm(): void {
    this.logger.max('PitComponent, createForm');

    this.pitForm = this.fb.group({
      header: this.fb.group({
        teamMemberId: ['', Validators.required],
        eventId: ['', Validators.required],
        teamId: ['', Validators.required],
      }),
      robotStats: this.fb.group({
        weight: '',
        height: '',
        teamShirt: '',
        robotFront: '',
        robotSide: ''
      }),
      powerCells: this.fb.group({
        manipulate: false,
        groundIntake: false,
        loadingStationIntake: false,
        storageCapacity: '',
        shootingMechanism: ''
      }),
      climb: this.fb.group({
        canClimb: false,
        selfLevel: false,
        buddyClimb: false,
        buddy: '',
        titling: false,
        climbType: '',
        height: '',
        secureHold: false,
        timeSecureHold: '',
        timeClimb: '',
        climbMechanism: ''
      }),
      controlPanel: this.fb.group({
        positionControl: false,
        rotationControl: false,
        brakes: false,
        sensor: false
      }),
      auto: this.fb.group({
        line: false,
        shoot: false,
        balls: 0,
        pickup: 0
      })
    });

  }

  public onSubmit(): void {
    this.logger.debug('PitComponent, onSubmit, values: ', this.pitForm.value);
    this.spinner = true;

    const pit: Pit = this.convertValuesToPitClass(this.pitForm.value);
    this.dataStorageService.storePit(pit);

    this.spinner = false;
    this.successMessage = 'Pit details saved to storage';
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);


    // this.qrValue = `${JSON.stringify(this.pitForm.value)}`;
  }

  public convertValuesToPitClass(values: any): Pit {
    const p: Pit = new Pit();

    this.logger.max('PitComponent, convertValuesToPitClass: ', p);

    return p;
  }

  private getTeamFromTeamId(id: number): Team {
    let t: Team = new Team();
    this.teams.forEach(tm => {
      if (id === tm.id) {
        t = tm;
      }
    });
    return t;
  }

  private getTeamMemberFromId(id: number): TeamMember {
    let t: TeamMember = new TeamMember();
    this.teamMembers.forEach(tm => {
      if (id === tm.id) {
        t = tm;
      }
    });
    return t;
  }

  ngOnInit() {}

}
