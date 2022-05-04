export default class Preferences {
    constructor(timezone, timeFormat, theme) {
        this.timezone = timezone || "GMT-0500";
        this.timeFormat = timeFormat || 24;
        this.theme = theme || 'white';
    }
};