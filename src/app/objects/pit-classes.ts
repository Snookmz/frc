import {FrcEvent} from './frcEvent-object';

export class Pit {
    header: Header;
    robotStats: RobotStats;
    powerCells: PowerCells;
    climb: Climb;
    controlPanel: ControlPanel;
    auto: Auto;
    constructor() {
        this.header = new Header();
        this.robotStats = new RobotStats();
        this.powerCells = new PowerCells();
        this.climb = new Climb();
        this.controlPanel = new ControlPanel();
        this.auto = new Auto();
    }
}

export class Header {
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
    loadingStationIntake: boolean;
    storageCapacity: number;
    shootingMechanism: string;
    constructor() {
        this.manipulate = false;
        this.groundIntake = false;
        this.loadingStationIntake = false;
        this.storageCapacity = 0;
        this.shootingMechanism = '';
    }
}

export class Climb {
    canClimb: boolean;
    selfLevel: boolean;
    buddyClimb: boolean;
    buddy: number;
    tilting: boolean;
    climbType: string;
    height: number;
    secureHold: boolean;
    timeSecureHold: '';
    timeClimb: '';
    climbMechanism: '';
    constructor() {
        this.canClimb = false;
        this.selfLevel = false;
        this.buddyClimb = false;
        this.buddy = 0;
        this.tilting = false;
        this.climbType = '';
        this.height = 0;
        this.secureHold = false;
        this.timeSecureHold = '';
        this.timeClimb = '';
        this.climbMechanism = '';
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
    line: boolean;
    shoot: boolean;
    balls: number;
    pickup: number;
    constructor() {
        this.line = false;
        this.shoot = false;
        this.balls = 0;
        this.pickup = 0;
    }
}


// old
export class ClimbType {
    id: number;
    name: string;
    constructor() {
        this.id = 0;
        this.name = '';
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

