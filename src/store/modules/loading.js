import { state } from "../state";
import { mutations } from "../mutations";
import { actions } from "../actions";

export const loading = {
    state: {

        ...state,
        loading: false,
    },
    actions: {

        ...actions
    },
    mutations: {

        ...mutations,
    },
}