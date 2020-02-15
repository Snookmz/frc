import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/loggerService/logger.service';
import {Pit} from '../objects/pit-classes';
import {DataInputService} from '../services/dataInputService/data-input.service';
import {DataStorageService} from '../services/dataStorageService/data-storage.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {
  public pits: Pit[];
  public qrValue: any;

  constructor(
      private alertController: AlertController,
      private logger: LoggerService,
      private dataInputService: DataInputService,
      private dataStorageService: DataStorageService
  ) {
    this.pits = this.dataStorageService.getAllPits();
    this.logger.max('QrComponent, pits: ', this.pits);
  }

  public deletePitQrCode(pit: Pit): void {
    this.dataStorageService.deletePit(pit);
    this.pits = this.dataStorageService.getAllPits();

  }

  public printPitQrCode(pit: Pit): void {
    this.qrValue = `${JSON.stringify(pit)}`;
  }

  async presentDeleteConfirm(pit: Pit) {
    const alert = await this.alertController.create({
      header: `Really Delete?`,
      message: 'Cannot be undone',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            this.deletePitQrCode(pit);
          }
        }
      ]
    });

    await alert.present();
  }



  ngOnInit() {}

}
