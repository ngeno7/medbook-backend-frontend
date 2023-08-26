<template>
    <div :id="`toastr-${ref}`" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header p-2">
            <strong class="me-auto" :class="{
                'text-primary': notification.status == 1,
                'text-warning': notification == 2,
                'text-danger': notification.status == 3,
            }">{{ title }}</strong>
            <small></small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body p-2 small">
            {{ notification.message }}
        </div>
    </div>
</template>
<script lang="js">
export default {
    name: "ToastMessage",

    data: () => ({
        ref: new Date().getTime()
    }),

    props: {
        notification: {
            type: Object,
            required: true,
        },
    },

    computed: {
        title() {
            let title = ``;
            switch (this.notification.status) {
                case 1:
                    title = `Success`;
                    break;
                case 2:
                    title = `Warning`;
                    break;
                case 3:
                    title = `Error`;
                    break;
                default:
                    break;
            }

            return title;
        }
    },

    mounted() {

        this.showNotification()
    },

    methods: {

        showNotification() {

            const toastLiveExample = document.getElementById(`toastr-${this.ref}`);
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show()
        }
    }
}
</script>