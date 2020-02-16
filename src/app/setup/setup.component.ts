import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {EventStorage, FrcEvent} from '../objects/frcEvent-object';
import {ModalController} from '@ionic/angular';
import {EventModalComponent} from './event-modal/event-modal.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {forkJoin, Observable} from 'rxjs';
import {Team} from '../objects/team-object';
import {Match} from '../objects/match-object';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {

  public countries: string[] = [];
  public selectedCountry: string = '';
  public selectedEvent: FrcEvent = new FrcEvent();
  public selectedEventStorage: EventStorage = new EventStorage();
  public events: FrcEvent[] = [];
  public errorMessage = '';
  public successMessage = '';
  public eventForm: FormGroup;
  public teamForm: FormGroup;
  public spinner = false;
  public submitted = false;

  constructor(
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService,
      private modalController: ModalController,
  ) {
  }

  private createEventForm(): void {
    this.eventForm = this.fb.group({
      country: [this.selectedEventStorage.event.country, Validators.required],
      eventCode: [this.selectedEventStorage.event.event_code, Validators.required],
      eventShortName: this.selectedEventStorage.event.short_name,
      deviceName: [this.selectedEventStorage.deviceName, Validators.required],
    });
    this.onEventFormChange();
  }

  private createTeamForm(): void {
    this.teamForm = this.fb.group({
      key: ['', Validators.required]
    })
  }


  private getEvents(): void {
    this.events = this.dataStorageService.getEventsFromStorage();

    if (this.events.length === 0) {
      this.dataInputService.getAllEventsFromApi().subscribe(result => {
            this.logger.max('SetupComponent, getAllEventsFromApi: ', result);
            this.events = result;
            this.events.sort((a: FrcEvent, b: FrcEvent) => {
              return a.short_name.localeCompare(b.short_name);
            });
            this.dataStorageService.storeEvents(this.events);
            this.getCountries(this.events);
          },
          reason => {
            this.logger.error('SetupComponent, getAllEventsFromApi, error: ', reason);
            this.errorMessage = 'Error getting Teams from API';
          })
    } else {
      this.events.sort((a: FrcEvent, b: FrcEvent) => {
        return a.short_name.localeCompare(b.short_name);
      });
      this.getCountries(this.events);
    }

  }

  private getCountries(events: FrcEvent[]): void {
    events.forEach(e => {
      let found = false;
      this.countries.forEach(c => {
        if (e.country === c) {
          found = true;
        }
      });
      if (!found) {
        this.countries.push(e.country);
      }
    });

    this.countries.sort((a: string, b: string) => {
      return a.localeCompare(b);
    });

    this.logger.max('SetupComponent, getCountries: ', this.countries);
  }

  public getEventStorageFromApiAndSaveToLocalStorage(e: FrcEvent): void {
    this.logger.max('SetupComponent, getTeamsForEventAndSaveToLocalStorage: ', e);
    this.spinner = true;

    this.dataInputService.getMatchesForEvent(e.key).subscribe(result => {
      this.logger.max('SetupComponent, getMatchesForEvent, result: ', result);
      const matches: Match[] = result;
      this.dataInputService.getTeamIdsForEvent(environment.eventYear, e.event_code).subscribe(result => {
        this.logger.max('SetupComponent, getTeamsForEventAndSaveToLocalStorage: ', result);
        const teamKeys: string[] = Object.keys(result);
        const list: Observable<Team>[] = [];

        teamKeys.forEach(k => {
          list.push(this.dataInputService.getTeamInfoFromTeamKey(k));
        });

        const eventStorage: EventStorage = new EventStorage();
        eventStorage.event = e;
        eventStorage.matches = matches;
        forkJoin(list).subscribe(results => {
          this.logger.max('setupComponent, forkJoin, results: ', results);
          results.forEach(t => {
            eventStorage.teams.push(t);
          });
          this.dataStorageService.addToEventsStorage(eventStorage);
          this.selectedEventStorage = eventStorage;
          this.selectedEventStorage.teams.sort((a: Team, b: Team) => {
            return a.nickname.localeCompare(b.nickname);
          });
          this.logger.max('SetupComponent, GetTeamInfoFromTeamKey, eventStorage: ', eventStorage);
        });
      }, reason => {
        this.logger.error('SetupComponent, getTeamIdsForEvent, error: ', reason);
      }, () => {
        this.spinner = false;
        this.createTeamForm();
        this.logger.max('SetupComponent, getTeamIdsForEvent, finished');
      })


    });


  }

  async presentEventModal() {
    const modal = await this.modalController.create({
      component: EventModalComponent,
      cssClass: ['ns-modal', 'ns-modal-page'],
      componentProps: {
        events: this.events,
        country: this.selectedCountry,
        deviceName: ['', Validators.required]
      }
    });
    modal.onWillDismiss().then(data => {
      this.logger.max('SetupComponent, event modal, dismiss: ', data.data.event);
      this.selectedEvent = data['event'];
      this.eventForm.patchValue({eventCode: data.data.event.event_code});
      this.eventForm.patchValue({eventShortName: data.data.event.short_name});
    });
    return await modal.present();
  }

  private onEventFormChange(): void {
    this.eventForm.get('country').valueChanges.subscribe(val => {
      this.selectedCountry = val;
      this.eventForm.patchValue({eventCode: ''});
      this.eventForm.patchValue({eventShortName: ''});
      this.teamForm = undefined;
      this.submitted = false;

    });
    this.eventForm.get('eventCode').valueChanges.subscribe(val => {
      this.logger.max('SetupComponent, eventForm eventCode change: ', val);
      this.events.forEach(e => {
        if (e.event_code === val) {
          this.selectedEventStorage = this.dataStorageService.getEventStorageFromEventCode(val);
          if (this.selectedEventStorage.teams.length === 0) {
            this.getEventStorageFromApiAndSaveToLocalStorage(e);
            this.submitted = false;
          } else {
            this.selectedEventStorage.teams.sort((a: Team, b: Team) => {
              return a.nickname.localeCompare(b.nickname);
            });
            this.createTeamForm();
            this.submitted = false;
          }
        }
      })

    })
  }

  public onSubmit(): void {
    this.logger.max('SetupComponent, onSubmit saving EventStorage: ', this.selectedEventStorage);
    this.submitted = true;
    this.selectedEventStorage.deviceName = this.eventForm.value.deviceName;
    this.dataStorageService.storeSelectedEventStorage(this.selectedEventStorage);
    this.successMessage = 'Event saved'
  }

  ngOnInit() {
    this.selectedEventStorage = this.dataStorageService.getSelectedEventStorage();
    this.getEvents();
    this.createEventForm();
  }

}
