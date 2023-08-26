<template>
    <div class="modal fade" :id="`staff-form-modal-${staff.id}`" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fs-5" id="staticBackdropLabel">Register Staff</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form :id="`staff-form-${staff.id}`" @submit.prevent="saveStaff" class="modal-body">
                    <div class="row">
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-first-name-${staff.id}`" class="form-label">First Name:*</label>
                            <input type="text" v-model.trim="staff.first_name" :id="`grid-first-name-${staff.id}`"
                                class="form-control form-control-sm">
                        </div>
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-middle-name-${staff.id}`" class="form-label">Middle Name:</label>
                            <input type="text" v-model.trim="staff.middle_name" :id="`grid-middle-name-${staff.id}`"
                                class="form-control form-control-sm">
                        </div>
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-last-name-${staff.id}`" class="form-label">Last Name:*</label>
                            <input type="text" v-model.trim="staff.last_name" :id="`grid-last-name-${staff.id}`"
                                class="form-control form-control-sm">
                        </div>
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-email-${staff.id}`" class="form-label">Username/Email:*</label>
                            <input type="text" v-model.trim="staff.email" :id="`grid-email-${staff.id}`"
                                class="form-control form-control-sm">
                        </div>
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-password-${staff.id}`" class="form-label">Password:*</label>
                            <input type="password" v-model.trim="staff.password" :id="`grid-password-${staff.id}`"
                                class="form-control form-control-sm">
                        </div>
                        <div class="col-md-4 col-sm-12 p-1">
                            <label :for="`grid-cpassword-${staff.id}`" class="form-label">Confirm Password:*</label>
                            <input type="password" :id="`grid-cpassword-${staff.id}`"
                                class="form-control form-control-sm">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <p class="text-muted">Roles</p>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div v-for="role in roles" class="col-md-3 col-sm-12">
                                    <div class="form-check">
                                        <input class="form-check-input" 
                                            type="checkbox" 
                                            :value="role.id" 
                                            v-model="staff.roles"
                                            :id="`role-select-${role.id}-${staff.id}`">
                                        <label class="form-check-label" :for="`role-select-${role.id}-${staff.id}`">
                                            {{ role.name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="modal-footer">
                    <button type="button" class="btn btn-xs btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" :form="`staff-form-${staff.id}`" class="btn btn-xs btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "StaffForm",

    emits: [ 'refresh', ],

    props: {
        staff: {
            type: Object,
            required: true,
            default: () => ({
                id: 0,
            })
        },
        roles: {
            type: Array,
            required: true,
        }
    },

    methods: {

        saveStaff() {
            this.$root.loading = true;
            window.axios.post(`staff`, this.staff).then(({ data }) => {
                this.$root.loading = false; 
                this.$root.showNotification({ status: 1, message: data.message });
                this.$emit(`refresh`);
                this.$root.closeModal(`staff-form-modal-${this.staff.id}`);
            }).catch(() => { this.$root.loading = false; })
        }
    }
}
</script>