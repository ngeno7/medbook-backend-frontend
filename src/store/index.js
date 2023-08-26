import { createStore } from "vuex";
import { notifications } from "./modules/notifications";
import { loading } from "./modules/loading";

export default createStore({
    namespaced: true,
    modules: {
        notifications,
        loading,
    }
})
