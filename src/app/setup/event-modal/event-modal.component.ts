import { Component, OnInit } from '@angular/core';
import {FrcEvent} from '../../objects/frcEvent-object';
import {ModalController, NavParams} from '@ionic/angular';
import {LoggerService} from '../../services/loggerService/logger.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {

  public events: FrcEvent[] = [];
  public country: string = '';

  constructor(
      private navParams: NavParams,
      private logger: LoggerService,
      private modalCtrl: ModalController
  ) {
    this.events = navParams.get('events');
    this.country = navParams.get('country');
    this.logger.max('EventsModalComponent, events: ', this.events);
  }

  public selectEvent(e: FrcEvent): void {
    this.modalCtrl.dismiss({
      event: e
    }).catch(reason => {
      this.logger.error('EventModalController, error dismissing modal: ', reason);
    });

  }

  ngOnInit() {}

}
