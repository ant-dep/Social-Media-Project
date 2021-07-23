<template>
    <div class="container-fluid">
        <div class="row mx-auto mb-5">
            <div class="col-8 col-lg-6 mx-auto border rounded bg-primary py-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-white font-weight-bold px-3">{{ userId }}</span>
                        <span class="text-white font-weight-bold px-3">{{ pseudo }}</span>
                        <span class="text-white font-weight-bold px-3">{{ email }}</span>
                    </div>
                    <span class="badge text-white align-self-start p-0">{{ createdAt.substr(0, 10).split("-").reverse().join("-") }}</span>
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
        userId: {
            type: Number,
        },
        imageUrl: {
            type: String
        },
        createdAt: {
            type: String
        }
    },
}
</script>

<style scoped>

#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>