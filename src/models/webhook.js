import config from "@/config/config";

export default class Webhook {
    constructor(_id, conditions, eid, symbol) {
        this._id = _id;
        this.conditions = conditions;
        this.eid = eid;
        this.symbol = symbol;
    };

    getEndpoint() {
        return config.WH_URL + "wh/" + this.eid;
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