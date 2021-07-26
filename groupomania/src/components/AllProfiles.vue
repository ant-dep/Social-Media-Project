<template>
    <div class="container-fluid">
        <div class="row mx-auto my-2">
            <div class="col-10 col-md-8 col-lg-6 mx-auto border rounded bg-primary">
                <slot name="AllUsers"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AllUsers",

    data() {
        return {}
    },
}
</script>

<style scoped>

</style>