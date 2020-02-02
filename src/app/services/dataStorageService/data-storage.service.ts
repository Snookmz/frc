import { Injectable } from '@angular/core';
import {LoggerService} from '../loggerService/logger.service';
import {Pit} from '../../objects/pit-classes';
import {FrcEvent} from '../../objects/frcEvent-object';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
      private logger: LoggerService
  ) { }

  public clearDataStorage(): void {
    localStorage.clear();
  }

  public deletePit(pit: Pit): void {
    this.logger.max('DataStorageService, deletePit: ', pit);
    // const key = `${pit.details.team.id} - ${pit.details.team.name}`;
    // this.deletePitKey(key);
    // localStorage.removeItem(key);
  }

  public deletePitKey(key: string): void {
    const keysString: string = localStorage.getItem('pitKeys');
    const keys: string[] = JSON.parse(keysString);
    localStorage.removeItem('pitKeys');
    keys.forEach(k => {
      if (k !== key) {
        this.storePitKey(k);
      }
    });

  }

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

  public getEventsFromStorage(): FrcEvent[] {
    const eventsString = localStorage.getItem('events');
    let es: FrcEvent[] = JSON.parse(eventsString);
    if (es === null) {
      es = [];
    }
    return es;
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

  public storeEvents(es: FrcEvent[]): void {
    this.logger.debug('dataStorageService, storeEvents: ', es);
    localStorage.setItem('events', JSON.stringify(es));
  }

  public storePit(pit: Pit): void {
    this.logger.debug('dataStorageService, storePitObject: ', pit);
    // const key = `${pit.details.team.id} - ${pit.details.team.name}`;
    // localStorage.setItem(key, JSON.stringify(pit));
    // this.storePitKey(key);

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

