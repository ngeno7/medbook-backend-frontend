export const mutations = {

    setItem(state, item) {
        state.item = item;
    },

    setItems(state, item) {

        state.items.push(item)
    }
}