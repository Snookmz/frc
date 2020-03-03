import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../../services/loggerService/logger.service';
import {FormService} from '../../services/formService/form.service';
import {Scout} from '../../objects/scout-parentData';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {

  public scout: Scout;

  constructor(
      private formService: FormService,
      private logger: LoggerService,
  ) { }

  ngOnInit() {
    this.logger.max('FinishComponent, ngOnInit');
    this.scout = this.formService.getScout();
  }

}
