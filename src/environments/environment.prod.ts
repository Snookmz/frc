import {NsLogLevel} from '../app/services/loggerService/logger-object';

export const environment = {
  production: true,
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
    base: 'https://frcapi.heathsnoek.me',
    scouts: '/scouts',
    pits: '/pits'
  }
};

