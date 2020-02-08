import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {Team} from '../objects/team-object';
import {District, EventStorage, FrcEvent} from '../objects/frcEvent-object';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {AlertController} from '@ionic/angular';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {

  public dataForm: FormGroup;
  public districts: District[];
  public selectedTeam: Team = new Team();
  public teams: Team[] = [];
  public events: FrcEvent[] = [];
  public eventForm: FormGroup;
  public eventsStorage: EventStorage[] = [];
  public selectedEventStorage: EventStorage = new EventStorage();
  public teamKeys: string[] = [];
  public teamForm: FormGroup;
  public errorMessage = '';
  public successMessage = '';

  constructor(
      private alertController: AlertController,
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService,
  ) {
    this.getEventsFromStorage();

    if (this.events.length !== 0) {
      this.createEventForm();
    }
  }

  async clearDataStorage() {
    const alert = await this.alertController.create({
      header: 'Are you Sure?',
      message: 'This cannot be undone',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'danger'
      }, {
        text: 'Confirm',
        handler: () => {
          this.dataStorageService.clearDataStorage();
        }
      }]
    });
    await alert.present();
  }

  public createEventForm(): void {
    this.eventForm = this.fb.group({
      event_code: ''
    });
    this.onEventFormChanges();
  }

  public createTeamForm(): void {
    this.teamForm = this.fb.group({
      team_number: ['', Validators.required]
    });
    this.onTeamFormChanges();
    this.logger.max('DataComponent, createTeamForm, returning: ', this.teamForm);
  }

  public createForm(): void {
    this.dataForm = this.fb.group({
      teamKey: ''
    });
  }

  public getAllEventsAndTeams(): void {
    this.logger.max('DataComponent, getAllEventsAndTeams');

    this.dataInputService.getAllEventsFromApi().subscribe(result => {
      const events: FrcEvent[] = result;

      const teamIds: Observable<string[]>[] = [];
      events.forEach(e => {
        teamIds.push(this.dataInputService.getTeamIdsForEvent(environment.eventYear, e.event_code))
      });

      forkJoin(teamIds).subscribe(results => {
        this.logger.max('DataComponent, getAllEventsAndTeams, teamIds: ', results);
      })

    })

  }

  public getDistrictsFromApi(): void {
    this.dataInputService.getDistrictsFromApi().subscribe(result => {
      this.logger.max('DataComponent, getDistrictsFromApi, result: ', result);
      this.districts = result;
    })
  }

  public getEventsFromStorage(): void {
    this.events = this.dataStorageService.getEventsFromStorage();
  }

  public getEventStorageFromApiAndSaveToLocalStorage(e: FrcEvent): void {
    this.logger.max('DataComponent, getTeamsForEventAndSaveToLocalStorage: ', e);
    this.dataInputService.getTeamIdsForEvent(environment.eventYear, e.event_code).subscribe(result => {
      this.logger.max('DataComponent, getTeamsForEventAndSaveToLocalStorage: ', result);
      this.teamKeys = Object.keys(result);

      const list: Observable<Team>[] = [];


      this.teamKeys.forEach(k => {
        list.push(this.dataInputService.getTeamInfoFromTeamKey(k));
      });

      const eventStorage: EventStorage = new EventStorage();
      eventStorage.event = e;
      forkJoin(list).subscribe(results => {
        this.logger.max('dataComponent, forkJoin, results: ', results);
        results.forEach(t => {
          eventStorage.teams.push(t);
        });
        this.dataStorageService.addToEventsStorage(eventStorage);
        this.selectedEventStorage = eventStorage;
        this.createTeamForm();
        this.logger.max('GetTeamInfoFromTeamKey, eventStorage: ', eventStorage);
      });
    })
  }

  public getEventStorageForEventCode(event_code: string): EventStorage {
    return this.dataStorageService.getEventStorageFromEventCode(event_code);
  }

  private onEventFormChanges(): void {
    this.eventForm.get('event_code').valueChanges.subscribe(val => {
      this.selectedEventStorage = this.getEventStorageForEventCode(val);
      if (this.selectedEventStorage.teams.length === 0) {
        this.events.forEach(e => {
          if (e.event_code === val) {
            this.getEventStorageFromApiAndSaveToLocalStorage(e);
          }
        })
      } else {
        this.createTeamForm();
      }
    });
  }

  private onTeamFormChanges(): void {
    this.teamForm.get('team_number').valueChanges.subscribe(val => {
      this.selectedEventStorage.teams.forEach(t => {
        if (t.team_number === val) {
          this.selectedTeam = t;
        }
      })
    })
  }

  ngOnInit() {
  }
}
