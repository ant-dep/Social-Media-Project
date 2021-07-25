<template>
    <div class="container-fluid">
        <div class="row mx-auto mb-5">
            <div class="col-8 col-lg-6 mx-auto border rounded bg-primary py-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <img id="imgProfile" class="rounded-circle" :src="imageUrlUser">
                        <span class="text-white font-weight-bold px-3">{{ pseudo }}</span>
                    </div>
                    <span class="badge text-white align-self-start p-0">{{ createdAt.substr(0, 10).split("-").reverse().join("-") }}</span>
                </div>
                <div class="card my-3 py-2 mx-auto">
                    {{ content }}
                    <div v-if="imageUrl">
                        <img id="imgpost" :src="imageUrl">
                    </div>
                </div>
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
    props: {
        pseudo: {
            type: String,
            default: ""
        },
        imageUrlUser: {
            type: String,
        },
        content: {
            type: String,
            default: ""
        },
        postId: {
            type: String
        },
        imageUrl: {
            type: String,
            default: "",
        },
        commentContent: {
            type: String
        },
        likes: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: String
        }
    },
}
</script>

<style scoped>

#imgProfile {
    height: 50px;
    width: 50px;
}

#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>