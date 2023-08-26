<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Medbook Test</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <a 
                    @click.prevent="logOut"
                    class="nav-link px-3" href="#">Sign out</a>
            </div>
        </div>
    </header>

    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-2 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3 sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{ name: 'home' }" aria-current="page">
                                <span data-feather="command" class="align-text-bottom"></span>
                                Dashboard
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>

            <main class="col-md-10 ms-sm-auto col-lg-10 px-md-4">
                <router-view></router-view>
                <div class="toast-container position-static position-fixed top-0 end-0 p-3">
                    <div v-for="notification in notifications">
                        <toastr :notification="notification"></toastr>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
import Toastr from './Toast.vue'
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('notifications')

export default {
    name: "AdminLayout",

    computed: {

        ...mapState({
            notifications: state => state.items,
        }),
    },

    methods: {

        logOut() {
            if(!window.confirm('Are you ready to log out?')) return;

            this.$root.loading = true;
            window.axios.post(`logout`).then(() => {
                this.$root.loading = false;
                window.location.reload();
            }).catch(() => { this.$root.loading = false; });
        },
    },

    components: {
        'toastr': Toastr,
    },

}
</script>