import { Component, OnInit } from '@angular/core';
import {EventStorage, FrcEvent} from '../objects/frcEvent-object';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {Team} from '../objects/team-object';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {

  public frcEvents: FrcEvent[] = [];
  public eventsStorage: EventStorage[] = [];
  public selectedTeams: Team[] = [];

  constructor(
      private logger: LoggerService,
      private storage: DataStorageService
  ) { }

  ngOnInit() {
    this.frcEvents = this.storage.getEventsFromStorage();
    this.eventsStorage = this.storage.getEventsStorage();
  }

}
