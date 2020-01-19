import { Injectable } from '@angular/core';
import {LoggerService} from '../loggerService/logger.service';
import {Pit} from '../../objects/pit-classes';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
      private logger: LoggerService
  ) { }

  public getAllPits(): Pit[] {
    this.logger.max('DataStorageService, getAllPitObjects');
    const pits: Pit[] = [];
    const keys: string[] = this.getPitKeys();
    keys.forEach(k => {
      const p: Pit = this.getPit(k);
      pits.push(p);
    });
    return pits;

  }

  private getPit(key: string): Pit {
    const pitString: string = localStorage.getItem(key);
    const pit: Pit = JSON.parse(pitString);
    return pit;
  }

  private getPitKeys(): string[] {
    const keysString: string = localStorage.getItem('pitKeys');
    const keys: string[] = JSON.parse(keysString);
    return keys;
  }

  public storePit(pit: Pit): void {
    this.logger.debug('dataStorageService, storePitObject: ', pit);
    const key = `${pit.detail.team.id} - ${pit.detail.team.name}`;
    localStorage.setItem(key, JSON.stringify(pit));
    this.storePitKey(key);

  }

  private storePitKey(key: string): void {
    this.logger.debug('dataStorageService, storePitKey: ', key);

    const keysString = localStorage.getItem('pitKeys');
    let keys: string[] = JSON.parse(keysString);

    if (keys === null) {
      keys = [];
    }

    keys.push(key);

    this.logger.max('DataStorageService, storePitKey, keys: ', keys);

    localStorage.setItem('pitKeys', JSON.stringify(keys));

  }

}

