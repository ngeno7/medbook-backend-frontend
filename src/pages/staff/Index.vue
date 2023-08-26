<template>
    <div class="card mt-3">
        <div class="card-header">
            <h5 class="h5">Staff</h5>
            <p class="text-muted small">Staff are able to log in here.</p>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 text-end">
                    <router-link class="btn btn-info btn-xs mr-2" :to="{
                        name: `staff.roles.index`
                    }">Roles</router-link>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#staff-form-modal-0"
                        class="btn btn-xs btn-primary">Add Staff</button>
                </div>
                <staff-form @refresh="() => {
                    fetchStaff();
                    addStaff = {
                        first_name: ``,
                        middle_name: ``,
                        last_name: ``,
                        roles: [],
                        email: ``,
                        active: true,
                        id: 0,
                    };
                }" :staff="addStaff" :roles="roles"></staff-form>
                <div class="table-responsive mt-1">
                    <table class="table table-bordered table-sm small">
                        <thead class="bg-secondary text-white">
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Username/Email</th>
                                <th>Roles</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="staff, key in staffs.data">
                                <td>{{ (key + 1) * staffs.current_page }}</td>
                                <td>{{ staff.full_name }}</td>
                                <td>{{ staff.email }}</td>
                                <td>{{ staff.role_names.join(', ') }}</td>
                                <td>
                                    <button type="button" data-bs-toggle="modal"
                                        :data-bs-target="`#staff-form-modal-${staff.id}`"
                                        class="btn btn-xs btn-primary">Edit</button>
                                </td>
                                <staff-form @refresh="() => {
                                    fetchStaff()
                                }" :staff="staff" :roles="roles"></staff-form>
                            </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item" v-for="link in staffs.links">
                                <button class="page-link" :class="{
                                    'disabled': link.url ? false : true,
                                    'bg-primary text-white': link.active
                                }" @click.prevent="fetchStaff(link.url)" v-html="link.label"></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StaffForm from './Form.vue';
export default {
    name: "StaffIndex",

    data: () => ({
        staffs: {
            data: [],
            links: [],
        },
        addStaff: {
            first_name: ``,
            middle_name: ``,
            last_name: ``,
            roles: [],
            email: ``,
            active: true,
            id: 0,
        },
        roles: [],
    }),

    async mounted() {
        this.$root.loading = true;
        await this.fetchStaff();
        await this.fetchStaffRoles();
        this.$root.loading = false;
    },

    methods: {

        async fetchStaff(url=`staff?paginate=1`) {

            await window.axios.get(`${url}&paginate=1`).then(({ data }) => {
                this.staffs = data;
            }).catch(() => { });
        },

        async fetchStaffRoles() {

            await window.axios.get(`staff/roles?active=1`).then(({ data }) => {
                this.roles = data;
            })
        },
    },

    components: {
        'staff-form': StaffForm,
    },
}
</script>