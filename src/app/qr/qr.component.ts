import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {Pit} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {
  public pits: Pit[];
  public qrValue: any;

  constructor(
      private logger: LoggerService,
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService
  ) {
    this.pits = this.dataStorageService.getAllPits();
  }

  public printAllPitsToQrCode(): void {
    const pits: Pit[] = this.dataStorageService.getAllPits();
    this.logger.max('QrComponent, printAllPitsToQrCode, pits: ', pits);
    this.qrValue = `${JSON.stringify(pits)}`;
  }

  public printPitQrCode(pit: Pit): void {
    this.qrValue = `${JSON.stringify(pit)}`;
  }



  ngOnInit() {}

}
