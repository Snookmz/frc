import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {Team} from '../objects/team-object';
import {District, FrcEvent} from '../objects/frcEvent-object';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {AlertController} from '@ionic/angular';

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
  public teamKeys: string[] = [];
  public errorMessage = '';
  public successMessage = '';

  constructor(
      private alertController: AlertController,
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService,
  ) {
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

  public createForm(): void {
    this.dataForm = this.fb.group({
      teamKey: ''
    });
  }

  public getDistrictsFromApi(): void {
    this.dataInputService.getDistrictsFromApi().subscribe(result => {
      this.logger.max('DataComponent, getDistrictsFromApi, result: ', result);
      this.districts = result;
    })
  }

  public getEventsFromApi(): void {
    this.dataInputService.getAllEventsFromApi().subscribe(result => {
      this.logger.debug('DataComponent, getEvents, result: ', result);
      this.events = result;
      this.dataStorageService.storeEvents(result);
    });
  }

  public getEventsFromStorage(): void {
    this.events = this.dataStorageService.getEventsFromStorage();
  }

  public getTeamDetailsFromTeamKey(key: string): void {
    this.logger.max('DataComponent, getTeamDetailsFromTeamKey: ', key);
    this.dataInputService.getTeamDataFromTeamKey(key).subscribe(result => {
      this.logger.max('DataComponent, getTeamDataFromTeamKey: ', result);
      this.selectedTeam = result;
    })
  }

  public getTeamIdsForEvent(eventKey: string): void {
    this.logger.max('DataComponent, getTeamIdsForEvent: ', eventKey);
    this.dataInputService.getTeamIdsForEvent(environment.eventYear, eventKey).subscribe(result => {
      this.logger.max('DataComponent, getTeamIdsForEvent: ', result);
      this.teamKeys = Object.keys(result);
      this.createForm();
      this.onChanges();
    })
  }

  public getTeams(): void {
    this.dataInputService.getTeamMembersFromApi().subscribe(result => {
      this.logger.debug('AppComponent, getTeams, getTeamMembersFromApi, result: ', result);
      this.teams = result;
      this.logger.max('AppComponent, getTeams, teams: ', this.teams);
    });
  }

  private onChanges(): void {
    this.dataForm.get('teamKey').valueChanges.subscribe(val => {
      this.getTeamDetailsFromTeamKey(val);
    })

  }

  ngOnInit() {
  }
}
