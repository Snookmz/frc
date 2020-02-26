import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Scout, ScoutParentData} from '../../objects/scout-parentData';
import {ScoutAuto} from '../../objects/scout-auto';
import {ScoutTele} from '../../objects/scoutTele';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _scout: BehaviorSubject<Scout> = new BehaviorSubject<Scout>(new Scout());
  public readonly  scout$: Observable<Scout> = this._scout.asObservable();


  constructor() { }

  public pushParentData(p: ScoutParentData): void {
    const s: Scout = this._scout.getValue();
    s.parentData = p;
    this._scout.next(s);
  }

  public pushAutoData(a: ScoutAuto): void {
    const s: Scout = this._scout.getValue();
    s.auto = a;
    this._scout.next(s);
  }

  public pushTeleData(t: ScoutTele): void {
    const s: Scout = this._scout.getValue();
    s.tele = t;
    this._scout.next(s);
  }
}
