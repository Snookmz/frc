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
