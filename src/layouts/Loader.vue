<template>
    <div v-show="$root.loading" class="preloader-wrapper">
        <div class="spinner-grow text-secondary" style="width: 3rem;height: 3rem;">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "Loader",
}
</script>
<style>
.preloader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(17, 17, 17, 0.399);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .4s ease;
    z-index: 1060;
}

.fade-out-animation {
    opacity: 0;
    visibility: hidden;
}
</style>