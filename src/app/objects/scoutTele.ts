export class ScoutTele {
    controlPanel: ControlPanel;
    endGame: EndGame;
    performance: Performance;
    constructor() {
        this.controlPanel = new ControlPanel();
        this.endGame = new EndGame();
        this.performance = new Performance();
    }
}

export class ControlPanel {
    tele_flPanelRotation: boolean;
    tele_idPanelRotationTime: number;
    tele_flPanelPosition: boolean;
    tele_idPanelPositionTime: number;
    tele_numPanelAttempt: number;
    tele_numPanelSuccess: number;
    constructor() {
        this.tele_flPanelRotation = false;
        this.tele_idPanelRotationTime = 0;
        this.tele_flPanelPosition = false;
        this.tele_idPanelPositionTime = 0;
        this.tele_numPanelAttempt = 0;
        this.tele_numPanelSuccess = 0;
    }
}

export class EndGame {
    tele_flPark: boolean;
    tele_idClimb: number;
    tele_idClimbGrabTime: number;
    tele_idClimbTime: number;
    tele_idClimbOutcome: number;
    tele_idClimbPos: number;
    tele_numClimbOthers: number;
    tele_flClimbBalance: boolean;
    tele_flClimbCorrection: boolean;
    tele_flClimbFall:  boolean;
    constructor() {
        this.tele_flPark = false;
        this.tele_idClimb = 0;
        this.tele_idClimbGrabTime = 0;
        this.tele_idClimbTime = 0;
        this.tele_idClimbPos = 0;
        this.tele_idClimbOutcome = 0;
        this.tele_numClimbOthers = 0;
        this.tele_flClimbBalance = false;
        this.tele_flClimbCorrection = false;
        this.tele_flClimbFall = false;
    }
}

export class Performance {
    tele_numCellAttempt: number;
    tele_numCellSuccess: number;
    tele_flOuter: boolean;
    tele_flInner: boolean;
    tele_flLower: boolean;
    constructor() {
        this.tele_numCellAttempt = 0;
        this.tele_numCellSuccess = 0;
        this.tele_flOuter = false;
        this.tele_flInner = false;
        this.tele_flLower = false;
    }
}
