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
  public errorMessage = '';
  public successMessage = '';

  constructor(
      private logger: LoggerService,
      private httpService: HttpService,
      private storage: DataStorageService
  ) { }


  public printScoutQrCode(s: Scout): void {
    this.qrValue = `${JSON.stringify(s)}`;
  }

  public printPitQrCode(p: PitStorage): void {
    this.pitQr = `${JSON.stringify(p.pit)}`;
  }

  public sendScoutToApi(s: Scout): void {
    const p: Post = new Post();
    p.json = s;
    this.scoutSpinner = true;
    this.httpService.httpPost(p, `${environment.url.scouts}`).subscribe(result => {
      this.logger.max('StorageComponent, sendScoutToApi, result: ', result);
      this.successMessage = 'Scout saved'
    }, reason => {
      this.logger.error('StorageComponent, sendScoutToApi, error: ', reason);
      this.scoutSpinner = false;
      this.errorMessage = reason.message;
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
