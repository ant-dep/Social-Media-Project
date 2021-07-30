<template>
    <div class="container-fluid">
        <div class="row mx-auto mb-5">
            <div class="col-9 col-md-8 col-lg-6 mx-auto border rounded bg-primary py-2">
                <slot name="Posts"></slot>
                <slot name="Comments"></slot>
                <slot name="EditCom"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Post",

    data() {
        return {}
    },
}
</script>

<style scoped>

</style>