export class ScoutAuto {
    auto: Auto;
    errors: Errors;
    performance: Performance;
    constructor() {
        this.auto = new Auto();
        this.errors = new Errors();
        this.performance = new Performance();
    }
}

export class Auto {
    auto_flStart: boolean;
    auto_flBaseLine: boolean;
    auto_numCellLoad: number;
    constructor() {
        this.auto_flStart = false;
        this.auto_flBaseLine = false;
        this.auto_numCellLoad = 0;
    }
}

export class Errors {
    auto_flFoul: boolean;
    auto_flRobotContact: boolean;
    auto_flLoseStartObject:  boolean;
    auto_flCrossover: boolean;
    constructor() {
        this.auto_flFoul = false;
        this.auto_flRobotContact = false;
        this.auto_flLoseStartObject = false;
        this.auto_flCrossover = false;
    }
}

export class Performance {
    auto_numCellAttempt: number;
    auto_numCellSuccess: number;
    auto_flOuter: boolean;
    auto_flInner: boolean;
    auto_flLower: boolean;
    constructor() {
        this.auto_numCellAttempt = 0;
        this.auto_numCellSuccess = 0;
        this.auto_flOuter = false;
        this.auto_flInner = false;
        this.auto_flLower = false;
    }
}
