<template>
    <div class="card mt-4">
        <div class="card-header">
            Patient Record
        </div>
        <div class="card-body">
            <form @submit.prevent="savePatientRecord" class="row">
                <div class="col-md-6">
                    <label for="grid-name" class="form-label">Name:</label>
                    <input type="text" v-model.trim="patient.name" required id="grid-name" class="form-control form-control-sm">
                </div>
                <div class="col-md-6">
                    <label for="grid-dob" class="form-label">DOB:</label>
                    <input type="date" v-model="patient.dob" id="grid-dob" class="form-control form-control-sm">
                </div>
                <div class="col-md-6">
                    <label for="grid-gender" class="form-label">Gender:</label>
                    <select v-model="patient.gender_id" required id="grid-gender" class="form-select form-select-sm">
                        <option v-for="gender in genders" :key="gender.id" :value="gender.id">{{ gender.name }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="grid-service" class="form-label">Service:</label>
                    <select v-model.trim="patient.service_id" required id="grid-service" class="form-select form-select-sm">
                        <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label for="grid-comment" class="form-label">Comment:</label>
                    <textarea  v-model.trim="patient.comment" id="grid-comment" cols="30" rows="1" class="form-control form-control-sm"></textarea>
                </div>
                <div class="col-12 text-end">
                    <button type="submit" class="btn btn-sm btn-primary mt-2">Save</button>
                </div>
            </form>
            <div class="row">
                <div class="col-12">
                    <div class="table-responsive mt-4">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Type Of Service</th>
                                    <th>General Comments</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="patientService in patientServices" :key="patientService.id">
                                    <td>{{  patientService.patient.name }}</td>
                                    <td>{{  $root.formatDate(patientService.patient.dob) }}</td>
                                    <td>{{  
                                        patientService.patient.gender ? patientService.patient.gender.name : '-'
                                        }}</td>
                                    <td>{{  patientService.service.name }}</td>
                                    <td>{{  patientService.comment }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Dashboard",

    data() {

        return {

            patient: {
                name: ``,
                dob: ``,
                service_id: null,
                gender_id: null
            },
            genders: [],
            services: [],
            patientServices: [],
        }
    },

    mounted() {
        this.$root.loading = true;
        this.fetchServices();
        this.fetchGenders();
        this.fetchPatientServices();
        this.$root.loading = false;
    },

    methods: {

        fetchServices() {

            window.axios.get(`services`).then(({ data }) => {
                this.services = data;
            }).catch(() => {});
        },

        fetchGenders() {
            window.axios.get(`genders`).then(({ data }) => {
                this.genders = data;
            }).catch(() => {});
        },

        fetchPatientServices() {

            window.axios.get(`patient-record/all`).then(({ data }) => {
                this.patientServices = data.data;
            }).catch(() => {})
        },

        savePatientRecord() {

            this.$root.loading = true;
            window.axios.post(`patient-record/save`, this.patient).then(({ data }) => {
                this.$root.loading = false;
                window.location.reload();
            }).catch(() => { this.$root.loading = false; });
        },
    }
}
</script>