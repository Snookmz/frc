import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {FrcEvent} from '../objects/frcEvent-object';
import {ModalController} from '@ionic/angular';
import {EventModalComponent} from './event-modal/event-modal.component';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {

  public events: FrcEvent[] = [];
  public errorMessage = '';

  constructor(
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private logger: LoggerService,
      private modalController: ModalController,
  ) {
    this.events = dataStorageService.getEventsFromStorage();

    if (this.events.length === 0) {
      this.dataInputService.getAllEventsFromApi().subscribe(result => {
            this.logger.max('SetupComponent, getAllEventsFromApi: ', result);
            this.events = result;
            this.events.sort((a: FrcEvent, b: FrcEvent) => {
              return a.short_name.localeCompare(b.short_name);
            });
            this.dataStorageService.storeEvents(this.events);
          },
          reason => {
            this.logger.error('SetupComponent, getAllEventsFromApi, error: ', reason);
            this.errorMessage = 'Error getting Teams from API';
          })
    } else {
      this.events.sort((a: FrcEvent, b: FrcEvent) => {
        return a.short_name.localeCompare(b.short_name);
      });
    }

  }

  async presentEventModal() {
    const modal = await this.modalController.create({
      component: EventModalComponent,
      cssClass: ['ns-modal', 'ns-modal-page'],
      componentProps: {
        events: this.events
      }
    });
    return await modal.present();
  }

  ngOnInit() {}

}
