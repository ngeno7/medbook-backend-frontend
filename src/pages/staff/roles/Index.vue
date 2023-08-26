<template>
<div class="card mt-3">
    <div class="card-header">
        <h5 class="h5">Roles</h5>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-12 text-end">
                <button 
                    type="button"
                    data-bs-toggle="modal" data-bs-target="#role-form-modal-0"
                    class="btn btn-xs btn-primary">Add Role</button>
            </div>
            <staff-role-form
                :role="addRole"
                :permissions="permissions"
                @refresh="() => {
                    addRole = {
                        id: 0,
                        name: ``,
                        description: ``,
                        active: true,
                    };
                    fetchStaffRoles();
                }"
            ></staff-role-form>
            <div class="table-responsive mt-1">
                <table class="table table-sm small">
                    <thead class="bg-secondary text-white">
                        <tr>
                            <th>#</th>
                            <th>Role</th>
                            <th>Description</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="role, key in roles.data">
                            <td>{{ (key+1)*roles.current_page }}</td>
                            <td>{{ role.name }}</td>
                            <td>{{ role.description }}</td>
                            <td>{{ role.active ? `Active` : `Not Active` }}</td>
                            <td>
                                <button 
                                    type="button"
                                    data-bs-toggle="modal" 
                                    :data-bs-target="`#role-form-modal-${role.id}`"
                                    class="btn btn-xs btn-primary">Edit</button>
                            </td>
                            <staff-role-form
                                :role="role"
                                :permissions="permissions"
                                @refresh="() => {
                                    fetchStaffRoles();
                                }"
                            ></staff-role-form>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="card-footer text-end">
        <router-link class="btn btn-link" :to="{ name: `staff.index`}">Staff</router-link>
    </div>
</div>
</template>
<script>
import StaffRoleForm from './Form.vue';
export default {
    name: "StaffRoleIndex",

    data: () => ({
        roles: {
            data: [],
            links: [],
        },
        addRole: {
            id: 0,
            name: ``,
            description: ``,
            active: true,
            role_permissions: [],
        },
        permissions: [],
    }),

    async mounted() {
        this.$root.loading = true;
        await this.fetchStaffRoles();
        await this.fetchPermissions();
        this.$root.loading = false;
    },

    methods: {
        async fetchStaffRoles() {

            await window.axios.get(`staff/roles?paginate=1`).then(({ data }) => {
                this.roles = data;
            })
        },

        async fetchPermissions() {

            window.axios.get(`staff/roles/permissions`).then(({ data }) => {
                this.permissions = data;
            }).catch(() => {})
        },
    },

    components: {
        'staff-role-form': StaffRoleForm,
    }
}
</script>