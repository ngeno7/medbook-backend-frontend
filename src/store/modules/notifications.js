import { state } from "../state";
import { mutations } from "../mutations";
import { actions } from "../actions";

export const notifications = {
    namespaced: true,
    state: {

        ...state,
    },
    actions: {

        ...actions
    },
    mutations: {

        ...mutations,
    },
}