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

export class AutoType {
    id: number;
    type: string;
    constructor() {
        this.id = 0;
        this.type = '';
    }
}

export class Speed {
    id: number;
    name: string;
    constructor() {
        this.id = 0;
        this.name = '';
    }
}

export class Height {
    id: number;
    name: string;
    constructor() {
        this.id = 0;
        this.name = '';
    }
}

// form stuff

export class Pit {
    header: Header;
    detail: Detail;
    hatches: Hatches;
    cargo: Cargo;
    sandstorm: Sandstorm;
    climb: Climb;
    image: Image;
    notes: string;
    constructor() {
        this.header = new Header();
        this.detail = new Detail();
        this.hatches = new Hatches();
        this.cargo = new Cargo();
        this.sandstorm = new Sandstorm();
        this.climb = new Climb();
        this.image = new Image();
        this.notes = '';
    }
}

export class Header {
    teamMember: TeamMember;
    event: string;
    constructor() {
        this.teamMember = new TeamMember();
        this.event = '';
    }
}

export class Detail {
    team: Team;
    teamMember: TeamMember;
    computerName: string;
    dtCreation: string;
    constructor() {
        this.team = new Team();
        this.teamMember = new TeamMember();
        this.computerName = '';
        this.dtCreation = '';
    }
}

export class Hatches {
    canManipulate: boolean;
    floorIntake: boolean;
    deliverLowLevel: boolean;
    deliverMidLevel: boolean;
    deliverHighLevel: boolean;
    notes: '';
    constructor() {
        this.canManipulate = false;
        this.floorIntake = false;
        this.deliverLowLevel = false;
        this.deliverMidLevel = false;
        this.deliverHighLevel = false;
        this.notes = '';
    }
}

export class Cargo {
    canManipulate: boolean;
    floorIntake: boolean;
    exchangeIntake: boolean;
    deliverLowLevel: boolean;
    deliverMidLevel: boolean;
    deliverHighLevel: boolean;
    notes: '';
    constructor() {
        this.canManipulate = false;
        this.floorIntake = false;
        this.exchangeIntake = false;
        this.deliverLowLevel = false;
        this.deliverMidLevel = false;
        this.deliverHighLevel = false;
        this.notes = '';
    }
}

export class Sandstorm {
    sandstormMode: boolean;
    control: string;
    maxHAB: Height;
    deliverHatch: boolean;
    maxHatches: number;
    maxHatchHeight: Height;
    deliverCargo: boolean;
    maxCargo: number;
    maxCargoHeight: Height;
    constructor() {
        this.sandstormMode = false;
        this.control = '';
        this.maxHAB = new Height();
        this.deliverHatch = false;
        this.maxHatches = 0;
        this.maxHatchHeight = new Height();
        this.deliverCargo = false;
        this.maxCargo = 0;
        this.maxCargoHeight = new Height();
    }
}

export class Climb {
    canClimb: boolean;
    type: string;
    grabSpeed: Speed;
    climbSpeed: Speed;
    maxHeight: Height;
    constructor() {
        this.canClimb = false;
        this.type = '';
        this.grabSpeed = new Speed();
        this.climbSpeed = new Speed();
        this.maxHeight = new Height();
    }
}

export class Image {
    front: string;
    side: string;
    constructor() {
        this.front = '';
        this.side = '';
    }
}
