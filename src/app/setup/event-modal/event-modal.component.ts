import { Component, OnInit } from '@angular/core';
import {FrcEvent} from '../../objects/frcEvent-object';
import {NavParams} from '@ionic/angular';
import {LoggerService} from '../../services/loggerService/logger.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {

  public events: FrcEvent[] = [];

  constructor(
      private navParams: NavParams,
      private logger: LoggerService
  ) {
    this.events = navParams.get('events');
    this.logger.max('EventsModalComponent, events: ', this.events);
  }


  ngOnInit() {}

}
