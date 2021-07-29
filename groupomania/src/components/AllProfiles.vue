<template>
    <div class="container-fluid">
        <div class="row mx-auto">
            <div class="col col-md-8 mx-auto border rounded bg-primary">
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