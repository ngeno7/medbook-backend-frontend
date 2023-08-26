export const actions = {
    setItem({ commit }, item) {

        commit('setItems', item)
    },

    setItems({ commit }, items) {

        commit('setItems', items)
    },
}