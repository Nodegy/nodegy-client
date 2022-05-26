export const updateLSObj = (name, k, v) => {
    try {
        const allPrefs = JSON.parse(localStorage.getItem(name));
        if (allPrefs) {
            allPrefs[k] = v;
            localStorage.setItem(name, JSON.stringify(allPrefs).replace(/\\"/g, ''));
        }

    } catch (err) {
    }

};