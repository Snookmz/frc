import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Scout, ScoutParentData} from '../../objects/scout-parentData';
import {ScoutAuto} from '../../objects/scout-auto';
import {ScoutTele} from '../../objects/scoutTele';
import {ScoutComments} from '../../objects/scout-Comments';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _scout: BehaviorSubject<Scout> = new BehaviorSubject<Scout>(new Scout());
  public readonly  scout$: Observable<Scout> = this._scout.asObservable();

  private _parentData: BehaviorSubject<ScoutParentData> = new BehaviorSubject<ScoutParentData>(new ScoutParentData());
  public readonly  parentData$: Observable<ScoutParentData> = this._parentData.asObservable();

  private _auto: BehaviorSubject<ScoutAuto> = new BehaviorSubject<ScoutAuto>(new ScoutAuto());
  public readonly auto$: Observable<ScoutAuto> = this._auto.asObservable();

  private _tele: BehaviorSubject<ScoutTele> = new BehaviorSubject<ScoutTele>(new ScoutTele());
  public readonly  tele$: Observable<ScoutTele> = this._tele.asObservable();

  private _comment: BehaviorSubject<ScoutComments> = new BehaviorSubject<ScoutComments>(new ScoutComments());
  public readonly  comment$: Observable<ScoutComments> = this._comment.asObservable();

  constructor() { }

  public clearScout(): void {
    const s: Scout = new Scout();
    this._scout.next(s);
    this._parentData.next(s.parentData);
    this._auto.next(s.auto);
    this._tele.next(s.tele);
    this._comment.next(s.comments);

  }

  public getScout(): Scout {
    const s: Scout = new Scout();
    s.parentData = this._parentData.getValue();
    s.auto = this._auto.getValue();
    s.tele = this._tele.getValue();
    s.comments = this._comment.getValue();
    return s;
  }

  public pushScout(s: Scout): void {
    this._scout.next(s);
  }

  public getParentData(): ScoutParentData {
    return this._parentData.getValue();
  }

  public pushParentData(p: ScoutParentData): void {
    this._parentData.next(p);
    const s: Scout = this._scout.getValue();
    s.parentData = p;
    this._scout.next(s);
  }

  public pushAutoData(a: ScoutAuto): void {
    this._auto.next(a);
    const s: Scout = this._scout.getValue();
    s.auto = a;
    this._scout.next(s);
  }

  public pushTeleData(t: ScoutTele): void {
    this._tele.next(t);
    const s: Scout = this._scout.getValue();
    s.tele = t;
    this._scout.next(s);
  }

  public pushCommentData(c: ScoutComments): void {
    this._comment.next(c);
    const s: Scout = this._scout.getValue();
    s.comments = c;
    this._scout.next(s);
  }
}
