import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventStorage} from '../objects/frcEvent-object';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-scout',
  templateUrl: './scout.component.html',
  styleUrls: ['./scout.component.scss'],
})
export class ScoutComponent implements OnInit {

  public parentDataForm: FormGroup;
  public selectedEventStorage: EventStorage;
  public selectedForm = 'auto';

  constructor(
      private dataStorageService: DataStorageService,
      private fb: FormBuilder,
      private logger: LoggerService,
      private router: Router
  ) {
  }

  public createParentDataForm(): void {
    this.parentDataForm = this.fb.group({
      frcEvent: [this.selectedEventStorage.event.event_code, Validators.required],
      teamDetails: this.fb.group({
        numMatch: ['', Validators.required],
        idAlliance: ['', Validators.required],
        idDriveStation: ['', Validators.required],
        idTeam: ['', Validators.required],
        txScoutName: [this.selectedEventStorage.deviceName, Validators.required]
      }),
      matchSetup: this.fb.group({
        idStartFacing: '',
        idStartPosition: '',
        numStartCells: '',
      }),
      results: this.fb.group({
        flRed: false,
        flYellow: false,
        flCrash: false,
        flRanking1: false,
        flRanking2: false
      })

    });
    this.logger.debug('ScoutComponent, createScoutForm, returning: ', this.parentDataForm);
  }

  private getSelectedEventStorage(): void {
    this.selectedEventStorage = this.dataStorageService.getSelectedEventStorage();
    this.logger.max('ScoutComponent, getSelectedEventStorage: ', this.selectedEventStorage);
  }

  public selectForm(form: string):void {
    this.selectedForm = form;
    this.router.navigateByUrl(`/scout/${form}`).catch(reason => {
      this.logger.error('ScoutComponent, error navigating to ' + form, reason);
    });
  }


  ngOnInit() {
    this.getSelectedEventStorage();
    this.createParentDataForm();
    const route = this.router.url;
    const routes = route.split('/');
    this.selectForm(routes[routes.length - 1]);
  }

}
