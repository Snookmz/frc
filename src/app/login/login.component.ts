import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../services/loggerService/logger.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {FrcEvent} from '../objects/frcEvent-object';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public errorMessage = '';
  public events: FrcEvent[] = [];
  public eventsForCountry: FrcEvent[] = [];
  public loginForm: FormGroup;
  public countries: string[] = [];
  public selectedCountry = '';

  constructor(
      private fb: FormBuilder,
      private logger: LoggerService,
      private dataStorageService: DataStorageService,
      private dataInputService: DataInputService

  ) {
    this.getEventsFromStorage();
    this.createForm();
  }

  public createForm(): void {
    this.loginForm = this.fb.group({
      teamKey: '',
      userName: '',
      eventKey: '',
      country: '',
    });
    this.logger.max('LoginComponent, createForm, returning: ', this.loginForm);
  }

  public getEventsFromApi(): void {
    this.dataInputService.getAllEventsFromApi().subscribe(result => {
          this.logger.max('LoginComponent, getEventsFromApi, result: ', result);
          this.countries = this.populateCountries(result);
          this.events = result;
          this.dataStorageService.storeEvents(result);
        },
        reason => {
          this.logger.error('LoginComponent, error getting events from api: ', reason);
          this.errorMessage = 'Error updating events from API. Check you have an Internet connection';
        })
  }

  public getEventsFromStorage(): void {
    this.events = this.dataStorageService.getEventsFromStorage();
    this.logger.max('LoginComponent, getEventsFromStorage, events: ', this.events);

    if (this.events.length !== 0) {
      this.countries = this.populateCountries(this.events);
    }

  }

  private getEventsFromCountry(country: string, events: FrcEvent[]): FrcEvent[] {
    const es: FrcEvent[] = [];
    events.forEach(e => {
      if (e.country === country) {
        es.push(e);
      }
    });
    return es;
  }

  private populateCountries(events: FrcEvent[]): string[] {
    const countries: string[] = [];
    events.forEach(e => {
      if (!this.isCountryInArray(e.country, countries)) {
        countries.push(e.country);
      }
    });
    return countries;
  }

  private isCountryInArray(country: string, countries: string[]): boolean {
    let seen = false;
    countries.forEach(c => {
      if (country === c) {
        seen = true;
      }
    });
    return seen;
  }

  ngOnInit() {
    this.onChanges();
  }

  private onChanges(): void {
    this.loginForm.get('country').valueChanges.subscribe(val => {
      this.selectedCountry = val;
      this.eventsForCountry = [];
      this.events.forEach(e => {
        if (e.country === val) {
          this.eventsForCountry.push(e);
        }
      })
    })

  }

}
