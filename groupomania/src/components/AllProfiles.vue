<template>
    <div class="container-fluid">
        <div class="row mx-auto mb-5">
            <div class="col-8 col-lg-6 mx-auto border rounded bg-primary py-2">
                <slot name="Users"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AllProfiles",

    data() {
        return {}
    },
}
</script>

<style scoped>

</style>