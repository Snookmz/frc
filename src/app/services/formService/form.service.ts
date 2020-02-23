import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ScoutParentData} from '../../objects/scout-parentData';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _parentData: BehaviorSubject<ScoutParentData> = new BehaviorSubject<ScoutParentData>(new ScoutParentData());
  public readonly  parentData$: Observable<ScoutParentData> = this._parentData.asObservable();


  constructor() { }

  public pushParentData(p: ScoutParentData): void {
    this._parentData.next(p);
  }
}
