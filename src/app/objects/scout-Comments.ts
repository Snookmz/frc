export class ScoutComments {
    drive: Drive;
    quickRatings: QuickRatings;
    advice: Advice;
    shotType: ShotType;
    loadType: LoadType;
    comm_txNotes: string;
    constructor() {
        this.drive = new Drive();
        this.quickRatings = new QuickRatings();
        this.advice = new Advice();
        this.shotType = new ShotType();
        this.loadType = new LoadType();
        this.comm_txNotes = '';
    }
}

export class Drive {
    comm_flAssist: boolean;
    comm_idDriveRating: number;
    comm_idDefenceRating: number;
    constructor() {
        this.comm_flAssist = false;
        this.comm_idDriveRating = 0;
        this.comm_idDefenceRating = 0;
    }
}

export class QuickRatings {
    comm_flAlliance: boolean;
    comm_flStrategy: boolean;
    comm_flOwnThing: boolean;
    comm_flRecovery: boolean;
    constructor() {
        this.comm_flAlliance = false;
        this.comm_flStrategy = false;
        this.comm_flOwnThing = false;
        this.comm_flRecovery = false;
    }
}

export class Advice {
    comm_flWarning: boolean;
    comm_flHighlight: boolean;
    constructor() {
        this.comm_flWarning = false;
        this.comm_flHighlight = false;
    }
}

export class ShotType {
    comm_flShotFar:  boolean;
    comm_flShotMid: boolean;
    comm_flShotNear: boolean;
    comm_flShotWall:  boolean;
    constructor() {
        this.comm_flShotFar = false;
        this.comm_flShotMid = false;
        this.comm_flShotNear = false;
        this.comm_flShotWall = false;
    }
}

export class LoadType {
    comm_flIntakeGround: boolean;
    comm_flIntakeHigh: boolean;
    comm_flIntakeRobot: boolean;
    constructor() {
        this.comm_flIntakeGround = false;
        this.comm_flIntakeHigh = false;
        this.comm_flIntakeRobot = false;
    }
}
