import Positions from './positions';
export default class Alert {
    constructor(alert) {
        this.isNew = alert ? false : true;
        const isNew = this.isNew;
        if (!isNew) {
            this._id = alert._id;
        };
        this.address = isNew ? null : alert.address;
        this.messages = isNew ? this.genDefaultMessages() : alert.messages;
        this.name = isNew ? null : alert.name;
        this.notes = isNew ? null : alert.notes;
        this.type = isNew ? null : alert.type;
    };

    genDefaultMessages() {
        let messages = [];
        const positions = new Positions().options;
        positions.forEach(pos => {
            messages.push({
                position: pos,
                message: {
                    text: this.getDefaultMessage(pos),
                    default: true
                }
            });
        });
        return messages;
    };

    getDefaultMessage(pos) {
        return `Alert Triggered! Name: {{ alert name }}.  Position: ${pos}.  Time: {{ time }}.`;
    };
};