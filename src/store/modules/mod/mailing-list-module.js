export const mailingList = {
    namespaced: true,
    state: {
        items: [],
    },

    actions: {
        init({ commit }, items) {
            commit("setItems", items);
        },

        delete({ commit }, itemIds) {
            commit("onDeleteItems", itemIds);
        }
    },

    mutations: {
        setItems(state, items) {
            state.items = items;
        },

        onDeleteItems(state, itemIds) {
            let itemsLeft = state.items.filter(key => !itemIds.includes(key._id));
            state.items = itemsLeft;
        }
    },

    getters: {
        getMailingList: state => {
            return state.items;
        },
    }

};