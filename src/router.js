import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import AdminLayout from './layouts/Admin'
import HomePage from './pages/Index.vue'
import StaffIndex from "./pages/staff/Index.vue";

const routes = [
    {
        path: '/',
        component: AdminLayout,
        children: [
            {
                path: '',
                component: HomePage,
                name: 'home',
            },
            {
                path: `staff`,
                component: StaffIndex,
                name: `staff.index`,
            },
            
        ],
    },
    { path: '/', redirect: { name: 'staff' } }

]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
