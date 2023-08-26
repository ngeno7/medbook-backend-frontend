<template>
    <div class="modal fade" :id="`role-form-modal-${role.id}`" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Role</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form :id="`role-form-${role.id}`" @submit.prevent="saveRole" class="row p-1">
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-name-${role.id}`" class="form-label">Name:</label>
                            <input type="text" required v-model.trim="role.name" :id="`grid-name-${role.id}`"
                                class="form-control form-control-sm">
                        </div>
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-description-${role.id}`" class="form-label">Description:</label>
                            <input type="text" v-model.trim="role.description" :id="`grid-description-${role.id}`"
                                class="form-control form-control-sm">
                        </div>
                        <div class="col-md-4 col-sm-12 p-2">
                            <div class="form-check mt-4">
                                <input class="form-check-input" type="checkbox" :value="true" v-model="role.active"
                                    :id="`grid-active-${role.id}`">
                                <label class="form-check-label" :for="`grid-active-${role.id}`">
                                    Active
                                </label>
                            </div>
                        </div>
                        <div v-for="permissionGroup in permissions" class="col-md-3 col-sm-12 border p-2 mt-3">
                            <h4 class="h6">{{ permissionGroup.name }}</h4>
                            <p class="text-muted small">{{ permissionGroup.description }}</p>
                            <div v-for="permission in permissionGroup.permissions" class="row">
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" 
                                            :value="permission.code" 
                                            v-model="role.role_permissions"
                                            :id="`permission-select-${permission.slug}-${role.id}`">
                                        <label class="form-check-label" :for="`permission-select-${permission.slug}-${role.id}`">
                                            {{ permission.description }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-xs btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" :form="`role-form-${role.id}`" class="btn btn-xs btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "RoleForm",

    emits: ['refresh',],

    props: {
        role: {
            type: Object,
            required: true,
        },
        permissions: {
            type: Array,
            required: true,
        },
    },

    methods: {

        saveRole() {
            this.$root.loading = true;
            window.axios.post(`staff/roles`, this.role).then(({ data }) => {
                this.$root.loading = false;
                this.$root.showNotification({ status: 1, message: data.message });
                this.$emit(`refresh`);
                this.$root.closeModal(`role-form-modal-${this.role.id}`);
            }).catch(() => { this.$root.loading = false; });
        }
    }
}
</script>