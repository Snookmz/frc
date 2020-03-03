import { Component, OnInit } from '@angular/core';
import {EventStorage, FrcEvent} from '../objects/frcEvent-object';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {Team} from '../objects/team-object';
import {Scout} from '../objects/scout-parentData';
import {Pit, PitStorage} from '../objects/pit-classes';
import {HttpService} from '../services/httpService/http.service';
import {Post} from '../objects/http-object';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {

  public frcEvents: FrcEvent[] = [];
  public eventsStorage: EventStorage[] = [];
  public selectedTeams: Team[] = [];
  public scouts: Scout[] = [];
  public selectedScout: Scout = new Scout();
  public qrValue: string = '';
  public pitQr: string = '';
  public pits: PitStorage[] = [];
  public selectedPit: PitStorage = new PitStorage();
  public scoutSpinner = false;
  public pitSpinner = false;
  public errorMessage = '';
  public successMessage = '';
  public pitSuccessMessage = '';
  public pitErrorMessage = '';

  constructor(
      private logger: LoggerService,
      private httpService: HttpService,
      private storage: DataStorageService
  ) { }

  doRefresh(event) {
    console.log('Begin async operation');
    this.frcEvents = this.storage.getEventsFromStorage();
    this.eventsStorage = this.storage.getEventsStorage();
    this.scouts = this.storage.getScoutMatches();
    this.pits = this.storage.getPits();
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  public printScoutQrCode(s: Scout): void {
    this.selectedScout = s;
    this.qrValue = `${JSON.stringify(s)}`;
  }

  public printPitQrCode(p: PitStorage): void {
    this.selectedPit = p;
    this.pitQr = `${JSON.stringify(p.pit)}`;
  }

  public sendScoutsToApi(): void {
    const p: Post = new Post();
    p.json = this.scouts;
    this.scoutSpinner = true;
    this.httpService.httpPost(p, `${environment.url.scouts}`).subscribe(result => {
      this.logger.max('StorageComponent, sendScoutToApi, result: ', result);
      this.successMessage = 'Scouts saved to Dropbox';
      this.scoutSpinner = false;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, reason => {
      this.logger.error('StorageComponent, sendScoutToApi, error: ', reason);
      this.scoutSpinner = false;
      this.errorMessage = reason.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 4000);
    }, () => {
      this.logger.debug('StorageComponent, sendScoutToApi, complete');
    })
  }

  public sendPitsToApi(): void {
    const p: Post = new Post();

    const pits: Pit[] = [];
    this.pits.forEach(p => {
      pits.push(p.pit);
    });

    p.json = pits;
    this.pitSpinner = true;
    this.httpService.httpPost(p, `${environment.url.pits}`).subscribe(result => {
      this.logger.max('StorageComponent, sendScoutToApi, result: ', result);
      this.pitSuccessMessage = 'Pits saved';
      this.pitSpinner = false;
      setTimeout(() => {
        this.pitSuccessMessage = '';
      }, 3000);
    }, reason => {
      this.logger.error('StorageComponent, sendScoutToApi, error: ', reason);
      this.pitSpinner = false;
      this.pitErrorMessage = reason.message;
      setTimeout(() => {
        this.pitErrorMessage = '';
      }, 4000);
    }, () => {
      this.logger.debug('StorageComponent, sendScoutToApi, complete');
    })
  }

  ngOnInit() {
    this.frcEvents = this.storage.getEventsFromStorage();
    this.eventsStorage = this.storage.getEventsStorage();
    this.scouts = this.storage.getScoutMatches();
    this.pits = this.storage.getPits();
  }

}
