<template>
    <div class="container-fluid">
        <div class="row mx-auto mb-5">
            <div class="col-8 col-lg-6 mx-auto border rounded bg-primary py-2">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="text-white font-weight-bold px-3">{{ id }}</span>
                    <span class="text-white font-weight-bold px-3">{{ pseudo }}</span>
                    <span class="text-white font-weight-bold px-3">{{ email }}</span>
                    <b-link class="delete badge badge-light font-weight-bold py-1 my-5" @click.prevent="deleteUser(user.id)"><small>Supprimer ce compte</small></b-link>
                </div>
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

    props: {
        pseudo: {
            type: String,
        },
        email: {
            type: String,
        },
        id: {
            type: Number,
        },
    }
}
</script>

<style scoped>

#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>