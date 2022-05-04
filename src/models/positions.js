export default class Positions {
    constructor(nullSelect) {
        const positions = [
            "Open Long",
            "Close Long",
            "Open Short",
            "Close Short"
        ];
        const states = ['long', 'short'];
        this.options = nullSelect ? [nullSelect, ...positions] : positions;
        this.states = nullSelect ? [nullSelect, ...states] : states;
    }
}