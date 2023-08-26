<template>
    <router-view></router-view>
    <Loader />
</template>
<script>
import Loader from './layouts/Loader.vue'
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('notifications')
import moment from "moment";
export default {
    name: "App",

    data: () => ({ loading: false, user: {}, }),

    components: {
        Loader
    },

    created() {
        // this.fetchAuthUser();
    },

    methods: {

        ...mapActions({
            showNotification: 'setItems',
        }),

        formatNumber(number) {

            return new Intl.NumberFormat('en-US', {
                style: 'decimal',
                useGrouping: true,
                minimumFractionDigits: 2,
                signDisplay: 'never'
            }).format(number ? parseFloat(number) : 0);
        },

        formatDate(date) {
            if (!date) return `-`;

            return moment(date).calendar()
        },

        closeModal(modalID) {
            const modal = bootstrap.Modal.getInstance(document.getElementById(modalID));
            modal.hide();
        },

        showModal(modalID) {
            const modal = new bootstrap.Modal(document.getElementById(modalID), { backdrop: 'static', });
            modal.show();
        },

        fetchAuthUser() {
            window.axios.get(`auth`).then(({ data }) => {
                this.user = data;
            }).catch(() => {});
        },
    },
}
</script>