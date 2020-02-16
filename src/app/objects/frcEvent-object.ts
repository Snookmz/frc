import {Team} from './team-object';
import {Match} from './match-object';

export class EventStorage {
    event: FrcEvent;
    teams: Team[];
    deviceName: string;
    matches: Match[];
    constructor() {
        this.event = new FrcEvent();
        this.teams = [];
        this.deviceName = '';
    }
}

export class FrcEvent {
    key: string;
    name: string;
    event_code: string;
    event_type: number;
    district: District;
    city: string;
    state_prov: string;
    country: string;
    start_date: string;
    end_date: string;
    year: number;
    short_name: string;
    event_type_string: string;
    week: number;
    address: string;
    postal_code: string;
    gmaps_place_id: string;
    gmaps_url: string;
    lat: number;
    lng: number;
    location_name: string;
    timezone: string;
    website: string;
    first_event_id: string;
    first_event_code: string;
    webcasts: Webcast[];
    division_keys: string[];
    parent_event_key: string;
    playoff_type: number;
    playoff_type_string: string;

    constructor() {
        this.key = '';
        this.name = '';
        this.event_code = '';
        this.event_type = 0;
        this.district = new District();
        this.state_prov = '';
        this.country = '';
        this.start_date = '';
        this.end_date = '';
        this.year = 0;
        this.short_name = '';
        this.event_type_string = '';
        this.week = 0;
        this.address ='';
        this.postal_code = '';
        this.gmaps_place_id = '';
        this.gmaps_url = '';
        this.lat = 0;
        this.lng = 0;
        this.location_name = '';
        this.timezone = '';
        this.website = '';
        this.first_event_id = '';
        this.first_event_code = '';
        this.webcasts = [];
        this.division_keys = [];
        this.parent_event_key = '';
        this.playoff_type = 0;
        this.playoff_type_string = '';
    }
}

export class District {
    abbreviation: string;
    display_name: string;
    key: string;
    year: number;
    constructor() {
        this.abbreviation = '';
        this.display_name = '';
        this.key = '';
        this.year = 0;
    }
}

export class Webcast {
    type: string;
    channel: string;
    file: string;
    constructor() {
        this.type = '';
        this.channel = '';
        this.file = '';
    }
}

// "key": "string",
//     "name": "string",
//     "event_code": "string",
//     "event_type": 0,
//     "district": {
//     "abbreviation": "string",
//         "display_name": "string",
//         "key": "string",
//         "year": 0
// },
// "city": "string",
//     "state_prov": "string",
//     "country": "string",
//     "start_date": "2020-02-01",
//     "end_date": "2020-02-01",
//     "year": 0
