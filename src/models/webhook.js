export default class Webhook {
    constructor(_id, conditions, eid, symbol) {
        this._id = _id;
        this.conditions = conditions;
        this.eid = eid;
        this.symbol = symbol;
    };

    getEndpoint() {
        return process.env.VUE_APP_API_URL + "wh/" + this.eid;
    };

    getPayload() {
        return {
            _id: this._id,
            conditions: this.conditions,
            symbol: this.symbol,
        };
    };

    getPayloadStr() {
        // return JSON.stringify(this.this.getPayload(), null, "\t");
        return JSON.stringify(this.getPayload());
    };

};