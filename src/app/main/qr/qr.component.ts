import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../../services/loggerService/logger.service';
import {DataInputService} from '../../services/dataInputService/data-input.service';
import {Team} from '../../objects/pit-classes';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {

  public qrValue: any;
  public teams: Team[] = [];

  constructor(
      private logger: LoggerService,
      private dataInputService: DataInputService
  ) {
    this.teams = this.dataInputService.getTeamData();

    this.qrValue = `${JSON.stringify(this.teams)}`;
  }



  ngOnInit() {}

}
