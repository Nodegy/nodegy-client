export default class Strategy {
    constructor(strategy) {
        this.isNew = strategy ? false : true;
        const isNew = this.isNew;
        if (!isNew) {
            this._id = strategy._id;
        };
        this.active = isNew ? false : strategy.active;
        this.conditionsReady = isNew ? [] : strategy.conditionsReady;
        this.stratData = isNew ? [{
            conditions: [{
                name: null,
                valType: null,
                val: null,
            }],
            position: null,
            requiredConditions: 'all'
        }] : strategy.stratData;
        this.activeStratData = isNew ?
            {
                conditions: [{
                    name: null,
                    val: null,
                }],
                lastTrigger: null,
                positionState: null
            } : strategy.activeStratData;
        this.alerts = isNew ? [] : strategy.alerts;
        this.name = isNew ? null : strategy.name;
        this.symbol = isNew ? null : strategy.symbol;
        this.notes = isNew ? null : strategy.notes;
    };

    getPreparedStrategy() {
        this.setConditionValTypes();
        this.setActiveStratData();
        this.setConditionsReady();

        const alertIds = this.alerts.map(alert => alert._id);

        return {
            activePosition: this.activePosition,
            activeStratData: this.activeStratData,
            alerts: alertIds,
            conditionsReady: this.conditionsReady,
            name: this.name,
            notes: this.notes,
            stratData: this.stratData,
            symbol: this.symbol,
        }
    };

    setConditionsReady() {
        const allConds = [];
        this.stratData.forEach(pos => {
            pos.conditions.forEach(cond => {
                const newCond = { name: cond.name, val: cond.val };
                if (!allConds.includes(newCond)) {
                    allConds.push(newCond);
                };

                if (this.conditionsReady.every(condReady =>
                    (cond.name !== condReady.name)
                    || (cond.name == condReady.name)
                    && (cond.val !== condReady.val))) {
                    this.conditionsReady.push({ ...newCond, ready: false });
                };
            });
        });
        this.conditionsReady.forEach((cond, idx) => {
            if (!allConds.some(condReady => (cond.name == condReady.name && cond.val == condReady.val))) {
                this.conditionsReady.splice(idx, 1);
            };
        });
    };

    setConditionValTypes() {
        this.stratData.forEach(pos => {
            pos.conditions.forEach(cond => {
                cond.valType = typeof cond.val;
            });
        });
    };

    setActiveStratData() {
        let activeConditions = [];

        this.stratData.forEach((pos) => {
            pos.conditions.forEach(cond => {
                if (this.activeStratData.conditions.every(item => item.name != cond.name) && activeConditions.every(item => item.name != cond.name)) {
                    activeConditions.push({ name: cond.name, val: null })
                } else {
                    this.activeStratData.conditions.forEach(item => {
                        if ((item.name == cond.name) && (activeConditions.every(activeData => activeData.name != item.name))) {
                            activeConditions.push(item);
                        };
                    });
                };
            });
        });
        this.activeStratData.conditions = activeConditions;
    };

    getChanges(changes) {
        Object.keys(changes).forEach(key => {
            switch (key) {
                case 'stratData':
                    this.setConditionValTypes();
                    this.setActiveStratData();
                    this.setConditionsReady();
                    changes.stratData = this.stratData;
                    changes.activeStratData = this.activeStratData;
                    changes.conditionsReady = this.conditionsReady;
                    break;
                case 'alerts':
                    changes.alerts = changes.alerts.map(alert => alert._id);
                default:
                    break;
            };
        });
        return changes;
    };

};