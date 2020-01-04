import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {NsLogLevel} from './logger-object';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  subject = null;
  level: number = environment.logger.level;

  constructor() {
    this.subject = new Subject();
  }

  private buildLogMsg(...logMsg): string {
    let msg: string;
    let timeNow: string;

    timeNow = new Date().toLocaleString();
    msg = timeNow + ' ' + logMsg.join(' ');

    return msg;
  }

  private consoleLogger(level: string, ...logMsg) {
    const timeNow = new Date().toLocaleString();
    const msg = `${level} ${timeNow} ${logMsg[0]}`;
    if (logMsg.length > 1) {
      logMsg.shift();
      console.log(msg, ...logMsg);
    } else {
      console.log(msg);
    }
  }


  debug(...logMsg) {
    let msg: string;

    if (this.level > NsLogLevel.debug) {
      return;
    }

    msg = 'Debug: ' + this.buildLogMsg(logMsg);
    if (environment.logger.level <= this.level) {
      if (environment.logger.outputTo === 'console') {
        this.consoleLogger('Debug', ...logMsg);
      } else {
        msg = 'Debug: ' + this.buildLogMsg(logMsg);
        this.subject.next(msg);
      }
    }
  }



  info(...logMsg) {
    let msg: string;

    if (this.level > NsLogLevel.info) {
      return;
    }

    msg = 'Info: ' + this.buildLogMsg(logMsg);
    if (environment.logger.level <= this.level) {
      if (environment.logger.outputTo === 'console') {
        this.consoleLogger('Info', ...logMsg);
      } else {
        this.subject.next(msg);
      }
    }
  }

  warning(...logMsg) {
    let msg: string;

    if (this.level > NsLogLevel.warning) {
      return;
    }

    msg = 'Warning: ' + this.buildLogMsg(logMsg);
    if (environment.logger.level <= this.level) {
      if (environment.logger.outputTo === 'console') {
        this.consoleLogger('Warning', ...logMsg);
      } else {
        this.subject.next(msg);
      }
    }
  }

  error(...logMsg) {
    let msg: string;

    if (this.level > NsLogLevel.error) {
      return;
    }

    msg = 'Error: ' + this.buildLogMsg(logMsg);
    if (environment.logger.level <= this.level) {
      if (environment.logger.outputTo === 'console') {
        this.consoleLogger('Error', ...logMsg);
      } else {
        this.subject.next(msg);
      }
    }
  }

  max(...logMsg) {


    if (this.level > NsLogLevel.max) {
      return;
    }

    if (environment.logger.level <= this.level) {
      if (environment.logger.outputTo === 'console') {
        this.consoleLogger('Max', ...logMsg);
      } else {
        this.subject.next(logMsg);
      }
    }

  }

}
