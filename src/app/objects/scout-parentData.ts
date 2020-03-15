import {ScoutAuto} from './scout-auto';
import {ScoutTele} from './scoutTele';
import {ScoutComments} from './scout-Comments';

export class Scout {
    parentData: ScoutParentData;
    auto: ScoutAuto;
    tele: ScoutTele;
    comments: ScoutComments;
    txCreateDate: string;
    constructor() {
        this.parentData = new ScoutParentData();
        this.auto = new ScoutAuto();
        this.tele = new ScoutTele();
        this.comments = new ScoutComments();
        this.txCreateDate = '';
    }
}

export class ScoutParentData {
    txEvent: string;
    deviceName: string;
    teamDetails: TeamDetails;
    matchSetup: MatchSetup;
    results: Results;
    constructor() {
        this.txEvent = '';
        this.teamDetails = new TeamDetails();
        this.matchSetup = new MatchSetup();
        this.results = new Results();

    }

}

export class TeamDetails {
    numMatch: number;
    idAlliance: number;
    idDriveStation: number;
    idTeam: number;
    txScoutName: string;
    constructor() {
        this.numMatch = 0;
        this.idAlliance = 0;
        this.idDriveStation = 0;
        this.idTeam = 0;
        this.txScoutName = '';
    }
}

export class MatchSetup {
    idStartFacing: number;
    idStartPosition: number;
    numStartCells: number;
    constructor() {
        this.idStartFacing = 0;
        this.idStartPosition = 0;
        this.numStartCells = 0;
    }
}

export class Results{
    flRed: boolean;
    flYellow: boolean;
    flCrash: boolean;
    flRanking1: boolean;
    flRanking2: boolean;
    constructor() {
        this.flRed = false;
        this.flYellow = false;
        this.flCrash = false;
        this.flRanking1 = false;
        this.flRanking2 = false;
    }
}
