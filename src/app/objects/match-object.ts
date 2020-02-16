export class Match {
    key: string;
    comp_level: string;
    set_number: number;
    match_number: number;
    alliances: Alliances;
    winning_alliance: string;
    event_key: string;
    time: number;
    actual_time: number;
    predicted_time: number;
    post_result_time: number;
    score_breakdown: any;
    videos: Video;
    constructor() {
        this.key = '';
        this.comp_level = '';
        this.set_number = 0;
        this.match_number = 0;
        this.alliances = new Alliances();
        this.winning_alliance = '';
        this.event_key = '';
        this.time = 0;
        this.actual_time = 0;
        this.predicted_time = 0;
        this.post_result_time = 0;
        this.score_breakdown = {};
        this.videos = new Video();
    }
}

export class Alliances {
    red: MatchAlliance;
    blue: MatchAlliance;
    constructor() {
        this.red = new MatchAlliance();
        this.blue = new MatchAlliance();
    }
}

export class MatchAlliance {
    score: number;
    team_keys: string[];
    surrogate_team_keys: string[];
    dq_team_keys: string[];
    constructor() {
        this.score = 0;
        this.team_keys = [];
        this.surrogate_team_keys = [];
        this.dq_team_keys = [];
    }
}

export class Video {
    type: string;
    key: string;
    constructor() {
        this.type = '';
        this.key = '';
    }
}
