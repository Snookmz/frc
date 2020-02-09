import {FrcEvent} from './frcEvent-object';
import {Team} from './team-object';

export class PitStorage {
    pit: Pit;
    event: FrcEvent;
    team: Team;
    constructor() {
        this.pit = new Pit();
        this.event = new FrcEvent();
        this.team = new Team();
    }
}

export class Pit {
    imperialUnits: boolean;
    event: FrcEvent;
    details: Details;
    robotStats: RobotStats;
    powerCells: PowerCells;
    climb: Climb;
    controlPanel: ControlPanel;
    auto: Auto;
    txPitNotes: string;
    record: Record;
    constructor() {
        this.imperialUnits = false;
        this.event = new FrcEvent();
        this.details = new Details();
        this.robotStats = new RobotStats();
        this.powerCells = new PowerCells();
        this.climb = new Climb();
        this.controlPanel = new ControlPanel();
        this.auto = new Auto();
        this.txPitNotes = '';
        this.record = new Record();
    }
}

export class Details {
    idTeam: string;
    name: string;
    txScoutName: string;
    constructor() {
        this.idTeam = '';
        this.name = '';
        this.txScoutName = '';
    }
}

export class RobotStats {
    numWeight: number;
    numHeight: number;
    imgTeamUniform: string;
    imgRobotFront: string;
    imgRobotSide: string;
    constructor() {
        this.numWeight = 0;
        this.numHeight = 0;
        this.imgTeamUniform = '';
        this.imgRobotFront = '';
        this.imgRobotSide = '';
    }
}

export class PowerCells {
    flCells: boolean; // manipulate
    flIntakeGround: boolean; // ground intake
    flIntakeHigh: boolean;
    numStorage: number;
    txShooting: string;
    flTargetLow: boolean;
    flTargetOuter: boolean;
    flTargetInner: boolean;
    constructor() {
        this.flCells = false;
        this.flIntakeGround = false;
        this.flIntakeHigh = false;
        this.numStorage = 0;
        this.txShooting = '';
        this.flTargetLow = false;
        this.flTargetOuter = false;
        this.flTargetInner = false;
    }
}

export class Climb {
    flClimb: boolean; // can climb
    idClimbType: string;
    numClimbHeight: number;
    flClimbSecure: boolean;
    idClimbGrab: number; // 1=NA, 2=slow, 3=Med, 4=fast
    idClimbSpeed: number; // same as above
    flClimbTilt: boolean;
    txClimb: string;
    idClimbPos: number; // preferred position 1=NA, 2=Any, 3=Inner, 4=Middle, 5=Outer
    flClimbLevel: boolean; // can level generator
    flClimbLevelSelf: boolean;
    flClimbLevelOther: boolean;
    flClimbMove: boolean;
    flClimbOther: boolean;
    numClimbOther: number; // buddies #

    constructor() {
        this.flClimb = false;
        this.idClimbType = '';
        this.numClimbHeight = 0;
        this.flClimbSecure = false;
        this.idClimbGrab = 1;
        this.idClimbSpeed = 1;
        this.flClimbTilt = false;
        this.txClimb = '';
        this.idClimbPos = 1;
        this.flClimbLevel = false;
        this.flClimbLevelSelf = false;
        this.flClimbLevelOther = false;
        this.flClimbMove = false;
        this.flClimbOther = false;
        this.numClimbOther = 0;

    }
}

export class ControlPanel {
    flPanel: boolean; // can manipulate control panel
    flPanelBrake: boolean;
    flPanelRotation: boolean;
    flPanelPos: boolean;
    flPanelSensor: boolean;
    txPanelSensor: string; // notes
    constructor() {
        this.flPanel = false;
        this.flPanelBrake = false;
        this.flPanelRotation = false;
        this.flPanelPos = false;
        this.flPanelSensor = false;
        this.txPanelSensor = '';
    }
}

export class Auto {
    flAuto: boolean; // can auto
    flAutoLine: boolean;
    flAutoShoot: boolean; // can auto shoot
    numAutoShoot: number; // number of balls
    numAutoLoad: number; // pickup
    constructor() {
        this.flAuto = false;
        this.flAutoLine = false;
        this.flAutoShoot = false;
        this.numAutoShoot = 0;
        this.numAutoLoad = 0;
    }
}

export class Record {
    dtCreated: string;
    dtModified: string;
    txComputerName: string;
    constructor() {
        this.dtCreated = '';
        this.dtModified = '';
        this.txComputerName = '';
    }
}


export class TeamMember {
    team: Team;
    id: number;
    firstName: string;
    lastName: string;
    constructor() {
        this.team = new Team();
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
    }

}

