import {FrcEvent} from './frcEvent-object';

export class Pit {
    details: Details;
    robotStats: RobotStats;
    powerCells: PowerCells;
    climb: Climb;
    controlPanel: ControlPanel;
    auto: Auto;
    record: Record;
    constructor() {
        this.details = new Details();
        this.robotStats = new RobotStats();
        this.powerCells = new PowerCells();
        this.climb = new Climb();
        this.controlPanel = new ControlPanel();
        this.auto = new Auto();
        this.record = new Record();
    }
}

export class Details {
    teamMember: TeamMember;
    team: Team;
    event: FrcEvent;
    constructor() {
        this.teamMember = new TeamMember();
        this.team = new Team();
        this.event = new FrcEvent();
    }
}

export class RobotStats {
    weight: number;
    height: number;
    teamShirt: string;
    robotFront: string;
    robotSide: string;
    constructor() {
        this.weight = 0;
        this.height = 0;
        this.teamShirt = '';
        this.robotFront = '';
        this.robotSide = '';
    }
}

export class PowerCells {
    manipulate: boolean;
    groundIntake: boolean;
    highLoadingStationIntake: boolean;
    storageCapacity: number;
    shootingMechanism: string;
    targetLower: boolean;
    targetOuter: boolean;
    targetInner: boolean;
    constructor() {
        this.manipulate = false;
        this.groundIntake = false;
        this.highLoadingStationIntake = false;
        this.storageCapacity = 0;
        this.shootingMechanism = '';
        this.targetLower = false;
        this.targetOuter = false;
        this.targetInner = false;
    }
}

export class Climb {
    canClimb: boolean;
    height: number;
    secureHold: boolean;
    timeSecureHold: string;
    timeClimb: string;
    tilting: boolean;
    climbMechanism: string;
    canLevelGenerator: boolean;
    levelSelf: boolean;
    levelOther: boolean;
    canBuddyClimb: boolean;
    buddy: number;

    constructor() {
        this.canClimb = false;
        this.height = 0;
        this.secureHold = false;
        this.timeSecureHold = '';
        this.timeClimb = '';
        this.tilting = false;
        this.climbMechanism = '';
        this.canLevelGenerator = false;
        this.levelSelf = false;
        this.levelOther = false;
        this.canBuddyClimb = false;
        this.buddy = 0;


    }
}

export class ControlPanel {
    positionControl: boolean;
    rotationControl: boolean;
    brakes: boolean;
    sensor: boolean;
    constructor() {
        this.positionControl = false;
        this.rotationControl = false;
        this.brakes = false;
        this.sensor = false;
    }
}

export class Auto {
    canAuto: boolean;
    line: boolean;
    canShoot: boolean;
    balls: number;
    pickup: number;
    constructor() {
        this.canAuto = false;
        this.line = false;
        this.canShoot = false;
        this.balls = 0;
        this.pickup = 0;
    }
}

export class Record {
    created: string;
    modified: string;
    deviceName: string;
    constructor() {
        this.created = '';
        this.modified = '';
        this.deviceName = '';
    }
}

export class Team {
    id: number;
    name: string;
    constructor() {
        this.id = 0;
        this.name = '';
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

