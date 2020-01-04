export class ReturnJson {
    success: boolean;
    json: any;
    message: string;

    constructor() {
        this.success = false;
        this.json = {};
        this.message = '';
    }
}

export class Post {
    sessionId: string;
    json: any;

    constructor() {
        this.sessionId = '';
        this.json = {};
    }
}
