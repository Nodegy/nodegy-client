import { errorHandler } from "@/services/_utils/index";
export default (unedited, edited) => {
    try {
        if (Object.keys(edited).includes("isNew") && edited.isNew) {
            return {
                hasChanges: true,
                changes: edited,
                changeCount: Object.keys(edited).length
            };
        };

        let baseKey = null;

        const avoidKeys = ['createdAt', 'updatedAt', '_id', 'eid', '__v', 'isNew'];
        let res = {
            hasChanges: false,
            changes: {},
            changeCount: 0,
        };
        let changeFlag = false;

        const updateRes = () => {
            res.changes[baseKey] = edited[baseKey];
            res.changeCount += 1;
            res.hasChanges = true;
        };

        const checkArr = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                updateRes();
            } else {
                arr1.forEach((i, idx) => {
                    typeCheck(arr1[idx], arr2[idx]);
                });
            };
        };

        const checkObj = (obj1, obj2) => {
            if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                updateRes();
            } else {
                Object.keys(obj1).forEach(objKey => {
                    if (!avoidKeys.includes(objKey)) {
                        typeCheck(obj1[objKey], obj2[objKey]);
                    };
                });
            };
        };

        const checkBaseObj = (obj1, obj2) => {
            Object.keys(obj1).forEach(key => {
                if (!avoidKeys.includes(key)) {
                    baseKey = key;
                    typeCheck(obj1[key], obj2[key]);
                    if (changeFlag) {
                        updateRes();
                        changeFlag = false;
                    };
                };
            });
        };

        const compare = (param1, param2) => {
            changeFlag = (param1 === param2) ? changeFlag : true;
        };

        const typeCheck = (param1, param2) => {
            const param1Type = Array.isArray(param1) ? 'array' : typeof param1;
            const param2Type = Array.isArray(param2) ? 'array' : typeof param2;
            if (param1Type !== param2Type) {
                changeFlag = true;
            } else if (param1 === null || param1 === undefined
                || param2 === null || param2 === undefined) {
                compare(param1, param2);
            } else {
                switch (param1Type) {
                    case 'array':
                        checkArr(param1, param2);
                        break;
                    case 'object':
                        checkObj(param1, param2);
                        break;
                    default:
                        compare(param1, param2);
                        break;
                };
            };
        };

        if (!unedited || !edited) {
            res.hasChanges = true;
            return res
        };

        if (Array.isArray(unedited) !== Array.isArray(edited)
            || typeof unedited !== typeof edited) {
            res.hasChanges = true;
            return res;
        };

        typeof unedited === 'object' && typeof edited === 'object' ?
            checkBaseObj(unedited, edited) : typeCheck(unedited, edited);

        return res;

    } catch (err) {
        errorHandler("helpers", "checkForChanges", err);
        return {
            hasChanges: true,
            changes: edited,
            changeCount: null,
        };;
    };
};