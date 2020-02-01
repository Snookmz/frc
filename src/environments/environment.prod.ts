import {NsLogLevel} from '../app/services/loggerService/logger-object';

export const environment = {
  production: true,
  blueAlliance: {
    readKey: 'k9w9nJeu045mBGHOIQNIN5mL9Uii2QK6nanQdsMDvMfuMcenbxL6nL4X6cNeW0lb'
  },
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
    login: '/login',
    checkSession: '/user/check/session',
    getActivity: `/data/activity`,
    getTopN: `/data/top-n`,
    getTopClasses: `/data/top-classes`,
    policyList: `/policy/list`,
    policyActive: `/policy/get/active`,
    policyById: `/policy/get/id`
  }
};

