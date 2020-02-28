// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {NsLogLevel} from '../app/services/loggerService/logger-object';

export const environment = {
  production: false,
  blueAlliance: {
    readKey: 'k9w9nJeu045mBGHOIQNIN5mL9Uii2QK6nanQdsMDvMfuMcenbxL6nL4X6cNeW0lb',
    apiUrl: 'https://www.thebluealliance.com/api/v3'
  },
  eventYear: 2020,
  refreshTimeout: 3000,
  httpTimeout: 5000,
  httpRefreshDelay: 2000,
  httpRefreshTries: 3,
  mockData: false,
  logger: {
    outputToConsole: true,
    outputToServer: false,
    logDelay: 500,
    level: NsLogLevel.max,
    outputTo: 'console',
  },
  url: {
    base: 'http://localhost:8002',
    scouts: '/scouts'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
